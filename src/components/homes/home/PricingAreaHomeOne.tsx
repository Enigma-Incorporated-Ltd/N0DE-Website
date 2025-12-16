import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NodeService } from "../../../services";
import type { Plan } from "../../../components/plan-selection/components/PlanCard";
import PlanCard from "../../../components/plan-selection/components/PlanCard";
import Icon from "../../../components/AppIcon";
import BillingToggle from "../../../components/plan-selection/components/BillingToggle";

const PricingAreaHomeOne = () => {
  console.log("PricingAreaHomeOne mounted");
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchPlans1 = async () => {
    //   try {
    //     setLoading(true);
    //     const plansData = await NodeService.getLocalPlans();

    //     if (!plansData || !Array.isArray(plansData)) {
    //       console.warn(
    //         "fetchPlans: received non-array from NodeService.getLocalPlans",
    //         plansData
    //       );
    //       setPlans([]);
    //       setError(null);
    //       return;
    //     }

    //     const transformedPlans: Plan[] = plansData.map((apiPlan: any) => ({
    //       id: apiPlan.id.toString(),
    //       name: apiPlan.name,
    //       subtitle: apiPlan.subtitle || apiPlan.planSubTitle || "", // Add subtitle
    //       description:
    //         apiPlan.description ||
    //         apiPlan.planDescription ||
    //         `${apiPlan.name} Plan`,
    //       monthlyPrice: apiPlan.monthlyPrice,
    //       annualPrice: apiPlan.annualPrice ?? apiPlan.yearlyPrice ?? 0,
    //       features:
    //         apiPlan.features?.map((feature: any) => {
    //           // Handle different feature formats
    //           if (typeof feature === "string") {
    //             return {
    //               text: feature,
    //               included: true,
    //             };
    //           } else if (typeof feature === "object") {
    //             return {
    //               text:
    //                 feature.text ||
    //                 feature.description ||
    //                 feature.Description ||
    //                 "",
    //               included: true,
    //             };
    //           }
    //           return {
    //             text: "",
    //             included: true,
    //           };
    //         }) || [],
    //       guarantee: apiPlan.guarantee ?? "",
    //       isPopular: !!apiPlan.isPopular,
    //       active: apiPlan.isActive !== undefined ? apiPlan.isActive : true,
    //     }));

    //     // Filter to show only active plans
    //     const activePlans = transformedPlans.filter(
    //       (plan) => plan.active !== false
    //     );

    //     setPlans(activePlans);
    //     setError(null);
    //   } catch (err: any) {
    //     setError(err.message || "An error occurred");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchPlans = async () => {
      setLoading(true);

      try {
        const plansData = await NodeService.getLocalPlans();

        if (!Array.isArray(plansData)) {
          console.warn("Invalid plans data:", plansData);
          setPlans([]);
          setError("No plans available");
        } else {
          const transformedPlans: Plan[] = plansData.map((apiPlan: any) => ({
            id: apiPlan.id.toString(),
            name: apiPlan.name,
            subtitle: apiPlan.subtitle || "",
            description: apiPlan.description || apiPlan.name,
            monthlyPrice: apiPlan.monthlyPrice,
            annualPrice: apiPlan.annualPrice ?? 0,
            features: apiPlan.features ?? [],
            guarantee: apiPlan.guarantee ?? "",
            isPopular: !!apiPlan.isPopular,
            active: apiPlan.isActive !== false,
          }));

          setPlans(transformedPlans.filter((p) => p.active));
          setError(null);
        }
      } catch (err: any) {
        console.error("fetchPlans failed:", err);
        setError("Failed to load plans");
        setPlans([]);
      } finally {
        setLoading(false); // ← ALWAYS reached
      }
    };

    fetchPlans();
  }, []);

  const handleBillingToggle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);

    // Navigate to login with plan details, userId, and planId
    navigate("/login", {
      state: {
        selectedPlan: plan,
        billingCycle: billingCycle,
        planId: plan.id,
      },
    });
  };

  return (
    <div className="bg-dark">
      <main className="section-space-md-y">
        <div className="container">
          <div className="text-center mb-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="mb-3">
                  <div
                    className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2"
                    data-cue="fadeIn"
                  >
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">
                      Subscription Prices
                    </span>
                  </div>
                  <h1
                    id="choose-your-level"
                    className="text-light mb-4 display-4 fw-bold"
                    data-cue="fadeIn"
                  >
                    Choose your level
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mb-5">
            <BillingToggle
              billingCycle={billingCycle}
              onToggle={handleBillingToggle}
            />
          </div>

          {loading ? (
            <div className="text-center">
              <Icon
                name="Loader2"
                size={48}
                className="text-primary-gradient mx-auto mb-4"
                style={{ animation: "spin 1s linear infinite" }}
              />
              <p className="text-light">Loading your plans...</p>
            </div>
          ) : error ? (
            <div className="text-center text-danger">Error: {error}</div>
          ) : (
            <div className="row g-4 mb-5">
              {plans.map((plan) => (
                <div key={plan.id} className="col-lg-4 col-md-6">
                  <PlanCard
                    plan={plan}
                    isPopular={plan.isPopular}
                    billingCycle={billingCycle}
                    onSelectPlan={handleSelectPlan}
                    isSelected={
                      selectedPlan
                        ? selectedPlan.id === plan.id
                        : plan.isPopular
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PricingAreaHomeOne;
