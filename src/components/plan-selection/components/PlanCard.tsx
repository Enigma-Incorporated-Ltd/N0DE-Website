import Icon from "../../../components/AppIcon";
import { currencyConfig } from "../../../services/Account";

// Types
interface PlanFeature {
  text?: string;
  description?: string;
  Description?: string;
  included?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: (PlanFeature | string)[];
  guarantee: string;
  isPopular: boolean;
  active?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  isPopular: boolean;
  billingCycle: string;
  onSelectPlan: (plan: Plan) => void;
  onUpgrade?: (plan: Plan) => void;
  isSelected: boolean;
  disabled?: boolean;
  hasActivePlan?: boolean;
  loading?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isPopular,
  billingCycle,
  onSelectPlan,
  onUpgrade,
  isSelected,
  disabled,
  hasActivePlan,
  loading,
}) => {
  const getPrice = () => {
    return billingCycle === "yearly" ? plan.annualPrice : plan.monthlyPrice;
  };

  const isContactPlan = plan.id === "max";

  const buttonText = disabled
    ? "Current Plan"
    : hasActivePlan
      ? loading
        ? "Upgrading..."
        : "Upgrade"
      : "Choose This Plan";

  return (
    <div
      className={`
      position-relative bg-dark border rounded-3 p-4 h-100 transition-all
      d-flex flex-column
      ${isPopular ? "border-warning shadow-lg" : "border-secondary"}
      ${isSelected ? "border-primary border-2" : ""}
    `}
      style={{
        transform: isPopular ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease",
        backgroundColor: "#2a2a2a",
      }}
    >
      {isPopular && (
        <div className="position-absolute top-0 start-50 translate-middle">
          <div
            className="px-3 py-1 text-dark fw-bold"
            style={{
              background: "linear-gradient(45deg, #f0f828, #4fb3d9)",
              borderRadius: "15px",
              fontSize: "12px",
            }}
          >
            ⚡ Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-light fw-bold mb-1 h4" style={{ fontSize: "24px" }}>
          N0DE {plan.name}
        </h3>
        {plan.subtitle && (
          <>
            <p
              className="text-light small mb-2"
              style={{ fontSize: "14px", opacity: 0.7, fontStyle: "italic" }}
            >
              {plan.subtitle}
            </p>
            <div
              style={{
                height: "1px",
                background: "rgba(255, 255, 255, 0.1)",
                margin: "0 auto 16px",
                width: "80%",
              }}
            />
          </>
        )}

        <div className="mb-3">
          {isContactPlan ? (
            <div className="display-6 text-light fw-bold">Contact Us</div>
          ) : (
            <>
              <span className="text-light fw-bold display-6">
                {currencyConfig.format(getPrice())}
              </span>
              <span className="text-light ms-1 fs-6">
                /{billingCycle === "yearly" ? "year" : "month"}
              </span>
            </>
          )}
        </div>

        <p
          className="text-light small mb-3"
          style={{ fontSize: "14px", opacity: 0.8 }}
        >
          {plan.description}
        </p>
        <div
          style={{
            height: "1px",
            background: "rgba(255, 255, 255, 0.1)",
            margin: "0 auto 16px",
            width: "80%",
          }}
        />

        {!isContactPlan && billingCycle === "yearly" && (
          <p className="text-light small mb-2" style={{ opacity: 0.8 }}>
            {currencyConfig.format(plan.annualPrice / 12)} per month, billed
            annually
          </p>
        )}

        {isContactPlan && (
          <p className="text-light small mb-2" style={{ opacity: 0.8 }}>
            This package is tailored
            <br />
            to your need and setup
          </p>
        )}
      </div>

      <div className="mb-4">
        {plan.features.map((feature, index) => {
          // Handle different feature formats
          let featureText = "";
          let isIncluded = true;

          if (typeof feature === "string") {
            featureText = feature;
          } else if (typeof feature === "object") {
            featureText =
              feature.text || feature.description || feature.Description || "";
            isIncluded =
              feature.included !== undefined ? feature.included : true;
          }

          return (
            <div key={index} className="d-flex align-items-start mb-2">
              <Icon
                name={isIncluded ? "Check" : "X"}
                size={16}
                className={`me-2 mt-1 ${isIncluded ? "text-success" : "text-secondary"}`}
              />
              <span
                className={`small ${isIncluded ? "text-light" : "text-secondary"}`}
                style={{ fontSize: "14px" }}
              >
                {featureText}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          className={`btn w-100 fw-medium position-relative d-flex align-items-center justify-content-center  ${
            isPopular ? "btn-warning text-dark" : "btn-outline-light"
          }`}
          onClick={() => {
            if (disabled) return;
            if (loading) return;
            if (hasActivePlan && onUpgrade) {
              onUpgrade(plan);
            } else {
              onSelectPlan(plan);
            }
          }}
          disabled={disabled || loading} // <-- Actually disable the button
          style={{
            borderRadius: "25px",
            padding: "12px 24px",
            fontSize: "14px",
            backgroundColor: disabled
              ? "#6c757d" // greyed out background
              : isPopular
                ? "#f0f828"
                : "transparent",
            borderColor: disabled
              ? "#6c757d"
              : isPopular
                ? "#f0f828"
                : "#6c757d",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {isSelected && !loading && (
            <Icon name="Check" size={16} className="me-2" />
          )}
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            />
          )}
          {buttonText}
        </button>

        {plan.guarantee && (
          <p className="text-light small text-center mt-2 mb-0">
            {plan.guarantee}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
