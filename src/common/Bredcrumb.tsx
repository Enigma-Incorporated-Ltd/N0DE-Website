import { Link } from "react-router-dom";

 

interface BreadcrumbProps {
  title?: string;
  subtitle?: string;
}

const Breadcrumb = ({ title, subtitle }: BreadcrumbProps) => {
  return (
    <div className="banner">
      <div className="section-space-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-light">{title}</h1>
              <nav 
                style={{
                  // Correct way to style in JSX
                  ['--bs-breadcrumb-divider' as any]: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`
                }}
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/" className="link text-light">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {subtitle}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;