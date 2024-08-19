import ContactAgency from "./ContactAgency";

const PropertyValueSection = () => {
  return (
    <div className="min-w-[350px] w-full min-h-[600px] border-t border-blue-900 shadow-sm text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-4">
          How Much Is Your Home Really Worth?
        </h2>
        <p className="text-lg mb-6">
          Enter your name, email, and property address, and an agent will
          contact you to provide an instant valuation.
        </p>
        <ContactAgency />
        <p className="">
          Join over 300,000 homeowners in finding your home's value.
        </p>
      </div>
    </div>
  );
};

export default PropertyValueSection;
