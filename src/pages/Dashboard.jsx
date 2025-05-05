import Header from "../components/Header";
import { RecentDocuments } from "../components/RecentDocument";
import DocumentTemplates from "../components/TemplateDocuments";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="px-42 py-4">
        <DocumentTemplates />
        <RecentDocuments />
      </div>
    </>
  );
}
