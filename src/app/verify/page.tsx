'use client';

import { useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';

export default function VerifyPage() {
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [secret, setSecret] = useState('');

    useEffect(() => {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const userIdParam = urlParams.get('userId');
        const secretParam = urlParams.get('secret');

        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
            handleVerification(userIdParam, secretParam);
        }
    }, []);

    const handleVerification = async (userId: string, secret: string) => {
        setVerificationStatus('loading');
        setErrorMessage('');
        console.log('yep')
        try {
            await account.updateVerification(userId, secret);
            setVerificationStatus('success');
        } catch (error: any) {
            console.error('Verification error:', error);
            setVerificationStatus('error');
            setErrorMessage(error.message || 'Verification failed. Please try again.');
        }
    };

    const handleManualVerification = async () => {
        if (!userId || !secret) {
            setErrorMessage('Please provide both User ID and Secret');
            return;
        }
        await handleVerification(userId, secret);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h1>
                    <p className="text-gray-600">Verify your email address to complete registration</p>
                </div>

                {verificationStatus === 'loading' && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Verifying your email...</p>
                    </div>
                )}

                {verificationStatus === 'success' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Successful!</h2>
                        <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                )}

                {verificationStatus === 'error' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-4">{errorMessage}</p>
                        <button
                            onClick={() => setVerificationStatus('idle')}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {verificationStatus === 'idle' && (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                                User ID
                            </label>
                            <input
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your User ID"
                            />
                        </div>
                        <div>
                            <label htmlFor="secret" className="block text-sm font-medium text-gray-700 mb-2">
                                Secret
                            </label>
                            <input
                                type="text"
                                id="secret"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your verification secret"
                            />
                        </div>
                        <button
                            onClick={handleManualVerification}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Verify Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 