import React, { useState, useEffect, useRef, FormEvent, DragEvent, ChangeEvent } from 'react';
import AccountService, {
  REQUEST_TYPE_OPTIONS,
  PRODUCT_SERVICE_OPTIONS,
} from '../../../services/Account';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { tokenStore } from '../../../utils/tokenStore';

const MAX_ATTACHMENTS_TOTAL_BYTES = 5 * 1024 * 1024;
const MAX_ATTACHMENTS = 10;
const MAX_DESCRIPTION_LENGTH = 2000;

interface FormData {
  summary: string;
  requestTypeId: string;
  productServiceId: string;
  description: string;
  contactEmail: string;
}

interface FormErrors {
  summary?: string;
  requestTypeId?: string;
  productServiceId?: string;
  description?: string;
  contactEmail?: string;
  attachments?: string;
  submit?: string;
}

interface AttachmentPreview {
  file: File;
  previewUrl: string | null;
}

const SupportTicketForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    summary: '',
    requestTypeId: '',
    productServiceId: '',
    description: '',
    contactEmail: '',
  });
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successInfo, setSuccessInfo] = useState<{
    ticketKey: string;
    attachmentsUploaded: number;
    attachmentsFailed: number;
  } | null>(null);

  useEffect(() => {
    const email = tokenStore.get().email;
    if (email) {
      setFormData((prev) => ({ ...prev, contactEmail: email }));
    }
  }, []);

  useEffect(() => {
    return () => {
      attachments.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      });
    };
  }, [attachments]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const fileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

  const addFiles = (incoming: FileList | File[]) => {
    const list = Array.from(incoming);
    if (list.length === 0) return;

    const existingKeys = new Set(attachments.map((a) => fileKey(a.file)));
    let totalBytes = attachments.reduce((sum, a) => sum + a.file.size, 0);
    const toAdd: AttachmentPreview[] = [];
    let error: string | undefined;

    for (const file of list) {
      if (attachments.length + toAdd.length >= MAX_ATTACHMENTS) {
        error = `Maximum ${MAX_ATTACHMENTS} files allowed.`;
        break;
      }
      const key = fileKey(file);
      if (existingKeys.has(key)) continue;

      if (totalBytes + file.size > MAX_ATTACHMENTS_TOTAL_BYTES) {
        error = 'Total attachment size must not exceed 5 MB.';
        break;
      }

      totalBytes += file.size;
      existingKeys.add(key);
      toAdd.push({
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      });
    }

    if (toAdd.length > 0) {
      setAttachments((prev) => [...prev, ...toAdd]);
    }
    setErrors((prev) => ({ ...prev, attachments: error }));
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const item = prev[index];
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
    setErrors((prev) => ({ ...prev, attachments: undefined }));
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (formData.summary.trim().length < 3) {
      newErrors.summary = 'Summary must be at least 3 characters';
    }

    if (!formData.requestTypeId) newErrors.requestTypeId = 'Request type is required';
    if (!formData.productServiceId) newErrors.productServiceId = 'Product/service is required';

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (errors.attachments) newErrors.attachments = errors.attachments;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    const email = tokenStore.get().email ?? '';
    attachments.forEach((a) => {
      if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
    });
    setFormData({
      summary: '',
      requestTypeId: '',
      productServiceId: '',
      description: '',
      contactEmail: email,
    });
    setAttachments([]);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessInfo(null);
    if (!validateForm()) return;

    const filesToUpload = attachments.map((a) => a.file);
    setIsSubmitting(true);

    try {
      const result = await AccountService.insertTicket({
        summary: formData.summary.trim(),
        description: formData.description.trim(),
        requestTypeId: formData.requestTypeId,
        productServiceId: formData.productServiceId,
        contactEmail: formData.contactEmail.trim(),
        attachments: filesToUpload.length > 0 ? filesToUpload : undefined,
      });

      if (result?.issueKey) {
        const uploaded = result.attachmentsUploaded ?? (result.attachmentUploaded ? 1 : 0);
        const failed = filesToUpload.length - uploaded;

        setSuccessInfo({
          ticketKey: result.issueKey,
          attachmentsUploaded: uploaded,
          attachmentsFailed: failed > 0 ? failed : 0,
        });
        resetForm();
      } else if (result?.success === false) {
        setErrors({ submit: result.message || 'Failed to submit ticket. Please try again.' });
      } else {
        setSuccessInfo({ ticketKey: '—', attachmentsUploaded: 0, attachmentsFailed: 0 });
        resetForm();
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to submit ticket. Please try again.';
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#181A20',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="text-center">
            <Icon
              name="Loader2"
              size={48}
              className="text-primary-gradient mx-auto mb-4"
              style={{ animation: 'spin 1s linear infinite' }}
            />
            <p className="text-light">Submitting your request...</p>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-start bg-dark" style={{ minHeight: 'auto', padding: '20px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-12 mb-4 mb-lg-0">
              <div
                className="card-gl-dark rounded-4 p-3 p-md-4 shadow-lg h-100"
                style={{ maxWidth: 560, width: '100%', margin: '0 auto' }}
              >
                <div className="text-center mb-3">
                  <Icon name="MessageSquare" size={24} className="text-gradient-primary mb-1" />
                  <h2 className="fw-bold text-gradient-primary mb-0" style={{ fontSize: '2rem' }}>
                    Submit a Support Request
                  </h2>
                  <p className="text-light-50 mb-0" style={{ fontSize: '1rem' }}>
                    Our team will respond within 24 hours
                  </p>
                </div>

                {successInfo && (
                  <div
                    className="p-3 mb-3 rounded-3 d-flex align-items-start"
                    style={{ background: 'rgba(40, 167, 69, 0.12)', border: '1px solid rgba(40, 167, 69, 0.45)' }}
                  >
                    <Icon name="CheckCircle" size={20} className="me-2 mt-1 flex-shrink-0" style={{ color: '#28a745' }} />
                    <div className="flex-fill">
                      <p className="fw-semibold text-light mb-1" style={{ fontSize: '1rem' }}>
                        Request submitted successfully
                      </p>
                      <p className="text-light text-opacity-75 mb-1 small">
                        Reference: <span className="text-light fw-medium">{successInfo.ticketKey}</span>
                      </p>
                      {successInfo.attachmentsUploaded > 0 && (
                        <p className="text-light text-opacity-75 mb-1 small">
                          {successInfo.attachmentsUploaded === 1
                            ? '1 file was included with this request.'
                            : `${successInfo.attachmentsUploaded} files were included with this request.`}
                        </p>
                      )}
                      {successInfo.attachmentsFailed > 0 && (
                        <p className="text-warning mb-1 small">
                          {successInfo.attachmentsFailed === 1
                            ? '1 file could not be attached. You can send it by reply email if needed.'
                            : `${successInfo.attachmentsFailed} files could not be attached. You can send them by reply email if needed.`}
                        </p>
                      )}
                      <p className="text-light text-opacity-75 mb-0 small">
                        Our team will respond within 24 hours. A confirmation email is on its way.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      onClick={() => setSuccessInfo(null)}
                      aria-label="Dismiss"
                    />
                  </div>
                )}

                {errors.submit && (
                  <div className="bg-danger bg-opacity-10 border border-danger rounded-3 p-3 d-flex align-items-center mb-3">
                    <Icon name="AlertCircle" size={18} className="text-danger me-2" />
                    <span className="text-danger">{errors.submit}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label text-light fw-medium mb-1" style={{ fontSize: '0.9rem' }}>
                      Summary <span className="text-danger">*</span>
                    </label>
                    <input
                      id="summary"
                      type="text"
                      className={`form-control bg-dark text-light border-light border-opacity-25 rounded-3 py-2 px-3 ${errors.summary ? 'border-danger' : ''}`}
                      style={{ fontSize: '0.9rem' }}
                      value={formData.summary}
                      onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                      maxLength={200}
                      placeholder="Enter a short, descriptive title"
                      disabled={isSubmitting}
                    />
                    {errors.summary && <div className="text-danger small mt-1">{errors.summary}</div>}
                  </div>

                  <div className="mb-3">
                    <Select
                      label="Request Types"
                      required
                      clearable
                      placeholder="Select request type"
                      options={[...REQUEST_TYPE_OPTIONS]}
                      value={formData.requestTypeId}
                      onChange={(value) => setFormData((prev) => ({ ...prev, requestTypeId: String(value) }))}
                      error={errors.requestTypeId}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <Select
                      label="Product/Service"
                      required
                      clearable
                      placeholder="Select product or service"
                      options={[...PRODUCT_SERVICE_OPTIONS]}
                      value={formData.productServiceId}
                      onChange={(value) => setFormData((prev) => ({ ...prev, productServiceId: String(value) }))}
                      error={errors.productServiceId}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label text-light fw-medium mb-1" style={{ fontSize: '0.9rem' }}>
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="description"
                      className={`form-control bg-dark text-light border-light border-opacity-25 rounded-3 py-2 px-3 ${errors.description ? 'border-danger' : ''}`}
                      style={{ minHeight: 100, resize: 'vertical', fontSize: '0.9rem' }}
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      maxLength={MAX_DESCRIPTION_LENGTH}
                      placeholder="Please describe your issue in detail."
                      disabled={isSubmitting}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <small className={errors.description ? 'text-danger' : 'text-light-50'} style={{ fontSize: '0.75rem' }}>
                        {errors.description || 'Minimum 10 characters required'}
                      </small>
                      <small className={formData.description.length > 1800 ? 'text-warning' : 'text-light-50'} style={{ fontSize: '0.75rem' }}>
                        {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
                      </small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light fw-medium mb-1" style={{ fontSize: '0.9rem' }}>
                      Attachments
                    </label>

                    <div
                      role="button"
                      tabIndex={0}
                      className={`rounded-3 p-4 text-center ${isDragging ? 'border-primary' : 'border-light border-opacity-25'}`}
                      style={{
                        border: '2px dashed',
                        background: isDragging ? 'rgba(0, 123, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        if (!isSubmitting) setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => !isSubmitting && fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (!isSubmitting) fileInputRef.current?.click();
                        }
                      }}
                    >
                      <Icon name="UploadCloud" size={28} className="text-light text-opacity-50 mb-2" />
                      <p className="text-light mb-1 small">
                        Drag and drop files here, or{' '}
                        <span className="text-primary">click to browse</span>
                      </p>
                      <p className="text-light-50 mb-0 small">
                        Up to {MAX_ATTACHMENTS} files, 5 MB total
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="d-none"
                        multiple
                        onChange={handleFileInput}
                        disabled={isSubmitting}
                      />
                    </div>

                    {errors.attachments && <div className="text-danger small mt-1">{errors.attachments}</div>}

                    {attachments.length > 0 && (
                      <div className="mt-3 d-flex flex-column gap-2">
                        {attachments.map((item, index) => (
                          <div
                            key={fileKey(item.file)}
                            className="d-flex align-items-start gap-3 p-2 rounded-3 border border-light border-opacity-10"
                          >
                            {item.previewUrl ? (
                              <img
                                src={item.previewUrl}
                                alt=""
                                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
                              />
                            ) : (
                              <div
                                className="d-flex align-items-center justify-content-center bg-dark rounded"
                                style={{ width: 48, height: 48 }}
                              >
                                <Icon name="File" size={20} className="text-light text-opacity-50" />
                              </div>
                            )}
                            <div className="flex-fill min-w-0">
                              <div className="text-light small text-truncate">{item.file.name}</div>
                              <div className="text-light-50 small">{(item.file.size / 1024).toFixed(1)} KB</div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-light border-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeAttachment(index);
                              }}
                              disabled={isSubmitting}
                              aria-label={`Remove ${item.file.name}`}
                            >
                              <Icon name="X" size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <Input
                      label="Your contact e-mail"
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      error={errors.contactEmail}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                      labelClassName="text-light"
                      className="bg-dark text-light border-light border-opacity-25 rounded-3"
                    />
                  </div>

                  <div className="rounded-3 p-3 d-flex align-items-center mb-3" style={{ background: 'linear-gradient(90deg, #007bff33 0%, #0056b355 100%)' }}>
                    <Icon name="Info" size={16} className="text-white me-2 flex-shrink-0" />
                    <span className="text-white small">
                      <span className="fw-bold">Note:</span> Please provide as much detail as possible. Step-by-step descriptions help us resolve your issue faster.
                    </span>
                  </div>

                  <div className="d-flex flex-column flex-sm-row gap-2 pt-1">
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="right"
                      className="flex-fill btn btn-primary-gradient btn-sm px-3 py-2 fs-6 rounded-pill d-flex align-items-center justify-content-center"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      disabled={isSubmitting}
                      className="flex-fill btn btn-outline-primary btn-sm px-3 py-2 fs-6 rounded-pill justify-content-center"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4 col-12 d-flex align-items-center">
              <div className="text-center mx-auto">
                <img
                  src="/assets/img/settings icon.png"
                  alt="Support Settings"
                  className="img-fluid"
                  style={{ maxWidth: '300px', height: 'auto', borderRadius: '12px' }}
                />
                <h5 className="text-light mt-3">How can I help you today?</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportTicketForm;
