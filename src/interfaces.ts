interface IApplication {
  id: string;
  date: number;
  title: string;
  region: string;
  adress: string;
  salaryIsTaxed: boolean;
  salaryAmountTo: number;
  salaryAmountFrom: number;
  subway: string;
  experience: string;
}

export default IApplication;
