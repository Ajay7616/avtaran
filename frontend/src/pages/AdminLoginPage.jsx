import React, { useState } from "react";

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this to your authentication API/backend.
    console.log("Admin login:", formData);
  };

  return (
    <main className="min-h-screen bg-grad-hero flex items-center justify-center px-5 py-10 relative overflow-hidden">

      {/* Decorative background */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(201,154,46,.14),transparent_65%)] -top-[300px] -right-[200px] pointer-events-none" />

      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(46,113,137,.10),transparent_65%)] -bottom-[250px] -left-[200px] pointer-events-none" />

      <div className="relative w-full max-w-[460px]">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-grad-teal shadow-brand-md">
            <span className="font-serif text-2xl font-semibold text-gold-1">
              A
            </span>
          </div>

          <h1 className="text-teal-900 text-[2rem] font-serif font-semibold mt-5">
            Admin Login
          </h1>

          <p className="text-muted text-[.95rem] mt-2">
            Sign in to access the administration panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[22px] p-8 sm:p-10 shadow-brand-md border border-line">

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[.88rem] font-semibold text-teal-900 mb-2"
              >
                Email Address
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="field-input"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="admin-password"
                  className="block text-[.88rem] font-semibold text-teal-900"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="field-input pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-transparent border-none cursor-pointer text-muted hover:text-teal-800 transition-colors"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            {/* <div className="flex items-center justify-between mt-5 gap-4">

              <label className="flex items-center gap-2 cursor-pointer text-[.84rem] text-muted">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#c99a2e]"
                />
                Remember me
              </label>

              <button
                type="button"
                className="bg-transparent border-none p-0 cursor-pointer text-[.84rem] font-semibold text-gold-deep hover:text-teal-800 transition-colors"
                onClick={() => {
                  // Add forgot-password flow here.
                }}
              >
                Forgot Password?
              </button>

            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-gold w-full justify-center mt-7"
            >
              Sign In
              <span aria-hidden="true">&rarr;</span>
            </button>

          </form>

        </div>

        {/* Footer */}
        <p className="text-center text-muted text-[.78rem] mt-6">
          &copy; {new Date().getFullYear()} Avtaran Capital. Admin access only.
        </p>

      </div>
    </main>
  );
}

export default AdminLoginPage;
