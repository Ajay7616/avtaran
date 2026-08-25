import React from "react";

function DashboardStats() {
  const stats = [
    {
      label: "Total Applications",
      value: "24",
      description: "Career submissions",
      icon: "↗",
      type: "gold",
    },
    {
      label: "New Applications",
      value: "8",
      description: "Awaiting review",
      icon: "+",
      type: "teal",
    },
    {
      label: "Contact Enquiries",
      value: "18",
      description: "Total enquiries",
      icon: "✉",
      type: "gold",
    },
  ];

  return (
    <div className="grid grid-cols-3 mob:grid-cols-1 gap-5 mb-8">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-line p-6 shadow-brand-sm"
        >
          <div className="flex items-start justify-between">

            <div>
              <p className="text-muted text-[.78rem] uppercase tracking-[.12em] font-semibold">
                {stat.label}
              </p>

              <div className="text-teal-900 text-3xl font-serif font-semibold mt-2">
                {stat.value}
              </div>

              <p className="text-muted text-[.78rem] mt-1">
                {stat.description}
              </p>
            </div>

            <div
              className={
                "w-11 h-11 rounded-xl grid place-items-center text-xl " +
                (stat.type === "gold"
                  ? "bg-gold-2 text-gold-deep"
                  : "bg-[rgba(46,113,137,.1)] text-teal-800")
              }
            >
              {stat.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default DashboardStats;