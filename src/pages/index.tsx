import AuthenticatedGuard from '@/components/guards/authenticated-guard';
import MainLayout from '@/components/layouts/main-layout';

export default function IndexPage() {
  return (
    <AuthenticatedGuard>
      <MainLayout>
        <div></div>
      </MainLayout>
    </AuthenticatedGuard>
  );
}
