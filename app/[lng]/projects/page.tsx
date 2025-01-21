import List from "./list";
import { useTranslation } from "@/app/i18n";
import MainLayout from "@/components/layouts";

export default async function Page({
  params: { lng },
}: {
  params: { lng: any };
}) {
  const { t } = await useTranslation(lng);

  return (
    <MainLayout title={t("ManageProjects")}>
      <List />
    </MainLayout>
  );
}
