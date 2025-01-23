import { getApiSelectValue } from "@/actions/expternalActions";
import { useTranslation } from "@/app/i18n";
import MainLayout from "@/components/layouts";
import { auth } from "@/auth";
import List from "./List";

export default async function Page({
  params: { lng, ...params },
  searchParams,
}: {
  params: { lng: any };
  searchParams: any;
}) {
  const { t } = await useTranslation(lng);
  const session: any = await auth();

  const filterValues = await getApiSelectValue(
    {
      project_type: searchParams.type,
      company: searchParams.company,
      cms_industry: searchParams.industry_id,
    },
    session?.access_token
  );

  return (
    <MainLayout title={t("ManageProjects")}>
      <List filter={filterValues} />
    </MainLayout>
  );
}
