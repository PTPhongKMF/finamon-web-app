import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ky } from '../api/ky';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const doRegister = useMutation({
        onMutate: () => {
            if (password !== confirmPassword) throw new Error("Mật khẩu không trùng khớp");
        },
        mutationFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return await ky.post("http://localhost:5296/api/auth/register", {
                json: {
                    email,
                    password
                }
            }).json();
        },
        onSuccess: (data) => {
            
        }
    })

    function handleRegister(e) {
        e.preventDefault();
        doRegister.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url(/images/register_banner.jpg)] bg-cover">

            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-12 text-center text-3xl font-extrabold text-gray-900">
                    Đăng ký
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật Khẩu
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
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Mật khẩu xác nhận
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {doRegister.isError && (
                        <div className="text-red-500 text-sm font-medium mt-2">
                            {"Lỗi: " + doRegister.error?.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={doRegister.isPending}
                        className="mt-12 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-green-600 disabled:cursor-not-allowed"
                    >
                        {doRegister.isPending ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                <Link to="/login" className="block text-sm mt-3 text-gray-700 hover:text-yellow-500">
                    Đã có tài khoản? ĐĂNG NHẬP NGAY
                </Link>
            </div>
        </div>
    );
}

export default Register;