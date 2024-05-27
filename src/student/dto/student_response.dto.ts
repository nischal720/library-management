
export class StudentresponseDto {
  id: number;
  uni_reg: string;
  first_name: string;
  last_name: string;
  gender: string;
  admission_date_np: string;
  admission_date_en: Date;
  dob_np: string;
  dob_en: Date;
  phone1?: string;
  phone2?: string;
  email?: string;
  blood_group: string;
  nationality: string;
  religion: string;
  cast: string;
  ethnic: string;
  disability: string;
  address1: string;
  address2: string;
  img: string;
  user: string;
  status: string;
  subjects: string[];
  createdBy: string;
}
