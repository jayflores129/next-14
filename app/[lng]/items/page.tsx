import { getListUtilies } from "@/actions/expternalActions";
import { authHeaders, baseUrl } from "@/api.utils";
import { useTranslation } from "@/app/i18n";
import { auth } from "@/auth";
import EquipmentSelect from "@/components/EquipmentSelect";
import MainLayout from "@/components/layouts";

export default async function Page({ params }: any) {
  const { t } = await useTranslation(params.lng);
  const session: any = await auth();

  let res = await fetch(`${baseUrl}/api/select/categories`, {
    headers: authHeaders(session?.access_token),
  });
  const categories = (await res.json()) || null;

  const list_utilities = await getListUtilies();

  return (
    <MainLayout access_token={session?.access_token}>
      <EquipmentSelect
        categories={categories}
        className="h-[calc(100vh-var(--header-height))] border-r w-[350px] border-xxborder/30 rounded-md"
      />
    </MainLayout>
  );
}
