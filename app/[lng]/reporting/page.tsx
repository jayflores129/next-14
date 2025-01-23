import { useTranslation } from "@/app/i18n";
import MainLayout from "@/components/layouts";

export default async function Page({ params, searchParams }: any) {
  const { t } = await useTranslation(params.lng);
  return (
    <MainLayout title={t("Reporting")}>
      <h1 className="text-lg font-medium">{t("Reporting")}</h1>
    </MainLayout>
  );
}
