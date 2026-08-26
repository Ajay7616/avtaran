import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, getAdminProfile } from "../api/api";

function AdminLoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // --------------------------------------------------
  // Check if admin is already logged in
  // --------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        await getAdminProfile();

        // Already logged in
        if (!cancelled) {
          navigate("/admin/dashboard", {
            replace: true,
          });
        }
      } catch (err) {
        // Not logged in
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    };

    checkSession();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // --------------------------------------------------
  // Handle login
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await adminLogin({
        email: formData.email.trim(),
        password: formData.password,
      });

      /*
       * IMPORTANT:
       * replace: true removes /admin/login from the
       * browser history after successful login.
       */
      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // While checking existing session
  // --------------------------------------------------
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-gold-2 border-t-gold-deep animate-spin" />

          <p className="text-muted text-[.85rem]">
            Checking session…
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Login page
  // --------------------------------------------------
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

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
                disabled={loading}
                className="field-input disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div className="mt-5">

              <label
                htmlFor="admin-password"
                className="block text-[.88rem] font-semibold text-teal-900 mb-2"
              >
                Password
              </label>

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
                  disabled={loading}
                  className="field-input pr-12 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-transparent border-none cursor-pointer text-muted hover:text-teal-800 transition-colors disabled:cursor-not-allowed"
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold w-full justify-center mt-7 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-teal-900 border-t-transparent animate-spin"
                    aria-hidden="true"
                  />

                  Signing in...
                </>
              ) : (
                <>
                  Sign In

                  <span aria-hidden="true">
                    &rarr;
                  </span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-muted text-[.78rem] mt-6">
          &copy; {new Date().getFullYear()} Avtaran Capital.
          Admin access only.
        </p>

      </div>
    </main>
  );
}

export default AdminLoginPage;