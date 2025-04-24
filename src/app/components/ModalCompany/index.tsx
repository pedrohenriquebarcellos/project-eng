import { Company } from "@/app/components/GetCompanies";
import styles from "./modalCompany.module.css";
import { X } from "phosphor-react";
import { api } from "@/lib/axios";

type Props = {
  company: Company;
  onClose: () => void;
};

export default function CompanyModal({ company, onClose }: Props) {
  async function handleRequestCompanyId(id: number) {
    const response = await api.get(`/companies/${id}`);
    console.log(response.data); 
  }

  const companyTypeDescription = {
    "f": "Cons. Final",
    "l": "Produtor Rural",
    "r": "Revendedor",
    "S": "Solidário",
    "x": "Exportação"
  }

  console.log(company.companyType);
  console.log(companyTypeDescription[company.companyType]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}><X size={32} /></button>
        <h2>Detalhes da Empresa</h2>
        <ul className={styles.modalWrapper}>
          <li><strong>ID:</strong> {company.id}</li>
          <li><strong>CNPJ:</strong> {company.cnpj}</li>
          <li><strong>Nome Fantasia:</strong> {company.companyFantasyName}</li>
          <li><strong>Razão Social:</strong> {company.companyLegalName}</li>
          <li><strong>Endereço:</strong> {company.companyAddressStreet}</li>
          <li><strong>Bairro:</strong> {company.companyAddressDistrict}</li>
          <li><strong>Número da Loja:</strong> {company.companyStoreIdNumber}</li>
          <li><strong>Tipo:</strong> {companyTypeDescription[company.companyType]}</li>
          <li><strong>CEP:</strong> {company.companyCEP}</li>
          <li><strong>Estado:</strong> {company.companyState}</li>
          <li><strong>Cidade:</strong> {company.companyCity}</li>
          <li className={company.companyHomePage ? '' : styles.empty}><strong>Região:</strong> {company.companyRegion || "Não informado"}</li>
          <li><strong>País:</strong> {company.companyCountryDescription}</li>
          <li><strong>Código do País:</strong> {company.companyCountryId}</li>
          <li><strong>Telefone:</strong> ({company.companyPhoneCode}) {company.companyPhone}</li>
          <li className={company.companyHomePage ? '' : styles.empty}><strong>Data de Abertura:</strong> {company.companyBirthDate || "Não informado"}</li>
          <li className={company.companyHomePage ? '' : styles.empty}><strong>Site:</strong> {company.companyHomePage || "Não informado"}</li>
        </ul>
        <button onClick={async () => {
          await handleRequestCompanyId(company.id)
        }}>
          Edit
        </button>
      </div>
    </div>
  );
}