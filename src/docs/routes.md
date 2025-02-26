## 📌 Route Structure Table

| Route               | Path              | Description                                                        | Access Type   |
| ------------------- | ----------------- | ------------------------------------------------------------------ | ------------- |
| **Home**            | `/`               | Landing page with an introduction and login/signup options.        | Public        |
| **Dashboard**       | `/dashboard`      | Main user dashboard showing active workspaces and recent activity. | 🔒 Protected  |
| **Workspace**       | `/workspace/[id]` | Real-time collaborative space for coding and discussions.          | 🔒 Protected  |
| **Profile**         | `/profile`        | User settings and profile customization.                           | 🔒 Protected  |
| **Settings**        | `/settings`       | Account settings, notifications, and preferences.                  | 🔒 Protected  |
| **Login**           | `/auth/login`     | Login page for authentication.                                     | Public        |
| **Signup**          | `/auth/signup`    | Registration page for new users.                                   | Public        |
| **Forgot Password** | `/auth/reset`     | Password reset request page.                                       | Public        |
| **Admin Panel**     | `/admin`          | Admin dashboard for managing workspaces and users.                 | 🔒 Admin Only |
