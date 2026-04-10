import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import MechanicalServiceForm from '@/components/forms/MechanicalServiceForm';
import AutobodyForm from '@/components/forms/AutobodyForm';
import CarRentalsForm from '@/components/forms/CarRentalsForm';
import SalesFinancingForm from '@/components/forms/SalesFinancingForm';
import DetailingForm from '@/components/forms/DetailingForm';
import AccidentInjuryForm from '@/components/forms/AccidentInjuryForm';
import RentalManagementForm from '@/components/forms/RentalManagementForm';
import InsuranceServicesForm from '@/components/forms/InsuranceServicesForm';

const FormPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const renderForm = () => {
    switch (serviceId) {
      case 'mechanical':
        return <MechanicalServiceForm serviceIdentifier="Mechanical Service" />;
      case 'autobody':
        return <AutobodyForm serviceIdentifier="Autobody & Collision" />;
      case 'rentals':
        return <CarRentalsForm serviceIdentifier="Car Rentals" />;
      case 'sales':
        return <SalesFinancingForm serviceIdentifier="Sales & Financing" />;
      case 'detailing':
        return <DetailingForm serviceIdentifier="Detailing & Wrapping" />;
      case 'injury':
        return <AccidentInjuryForm serviceIdentifier="Accident Injury" />;
      case 'management':
        return <RentalManagementForm serviceIdentifier="Rental Management" />;
      case 'insurance':
        return <InsuranceServicesForm serviceIdentifier="Insurance Services" />;
      default:
        return <Navigate to="/404" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0a]">
        {renderForm()}
      </div>
    </Layout>
  );
};

export default FormPage;
