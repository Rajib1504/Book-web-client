import ComparisonTable from "../../components/Pricing/ComparisonTable";
import PricingFAQ from "../../components/Pricing/PricingFAQ";
import PricingHero from "../../components/Pricing/PricingHero";
import PricingPlans from "../../components/Pricing/PricingPlans";
import TrustBadges from "../../components/Pricing/TrustBadges";

const PricingPage = () => {
      return (
            <div>
                  <PricingHero />
                  <PricingPlans />
                  <TrustBadges />
                  <ComparisonTable />
                  <PricingFAQ />
            </div>
      );
};

export default PricingPage;