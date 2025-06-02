import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { kyAspDotnet } from '../../api/ky';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useUserStore } from '../../stores/userStore';

function Login() {
    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = useMutation({
        mutationFn: async () => {
            return await kyAspDotnet.post("api/auth/login", {
                json: {
                    email,
                    password
                }
            }).json();
        },
        onSuccess: (data) => {
            if (data.isBanned) throw new Error("Bạn đã bị cấm, liên hệ hỗ trợ nếu bạn nghĩ đây là sai lầm");

            console.log(data);

            if (data.requiresVerification) {
                navigate("/verify-account", { state: { email: email } });
                return;
            }

            Cookies.set("token", data.data.token);
            const userRoles = data?.data?.user?.userRoles?.map(role => role.roleName) ?? [];
            setUser({
                name: data?.data?.user?.userName ?? data?.data?.user?.email.split("@")[0],
                roles: userRoles,
                image: data?.data?.user?.image ?? "https://st4.depositphotos.com/11634452/21365/v/450/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg",
            });

            if (userRoles.some(role => role === "Staff")) {
                navigate("/dashboard/staff");
                return;
            }

            if (userRoles.some(role => role === "Admin")) {
                navigate("/dashboard/admin");
                return;
            }

            navigate("/");
        }
    })

    function handleLogin(e) {
        e.preventDefault();
        doLogin.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url(/images/login_bg.webp)] bg-cover">

            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <h2 className=" mb-12 text-center text-3xl font-extrabold text-gray-900">
                    Đăng nhập
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Điền email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Điền mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {doLogin.isError && (
                        <div className="text-red-500 text-sm font-medium mt-2">
                            {"Lỗi: " + doLogin.error?.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={doLogin.isPending}
                        className="mt-12 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium cursor-pointer rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-yellow-600 disabled:cursor-not-allowed"
                    >
                        {doLogin.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <Link to="/register" className="block text-sm mt-3 text-gray-700 hover:text-green-600">
                    Chưa có tài khoản? ĐĂNG KÝ NGAY
                </Link>
            </div>

        </div>
    );
}

export default Login;