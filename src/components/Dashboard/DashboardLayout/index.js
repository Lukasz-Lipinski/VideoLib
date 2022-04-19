import DashboardNavigation from "../Navigation/Navigation";

function DashboardLayout({ children, profile }) {
  return (
    <div className="dashboard">
      <DashboardNavigation profile={profile} />
      <main>{children}</main>
    </div>
  );
}

export default DashboardLayout;
