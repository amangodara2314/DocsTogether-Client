import { useEffect, useState } from "react";
import Header from "../components/Header";
import { RecentDocuments } from "../components/RecentDocument";
import DocumentTemplates from "../components/TemplateDocuments";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { getUser } from "../services/authServices";
import { setUser } from "../features/user/userSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = Cookies.get("auth-token");
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    getUser().then((res) => {
      dispatch(setUser({ user: res.data.user, token }));
      setIsAuthenticating(false);
    });
  }, []);
  if (isAuthenticating || !user) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <div className="px-6 sm:px-16 xl:px-42 py-4">
        <DocumentTemplates />
        <RecentDocuments />
      </div>
    </>
  );
}
