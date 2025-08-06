# Email Verification Setup

This project includes an email verification page at `/verify` that uses the Appwrite SDK.

## Setup Instructions

### 1. Appwrite Configuration

Create a `.env.local` file in the root directory with your Appwrite credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
```

### 2. Appwrite Project Setup

1. Create a new project in your Appwrite console
2. Enable Authentication in your project settings
3. Configure email templates for verification emails
4. Set up your domain for email verification links

### 3. Usage

The verification page supports two methods:

#### Automatic Verification (Recommended)
When users click the verification link from their email, they'll be redirected to:
```
/verify?userId=USER_ID&secret=VERIFICATION_SECRET
```

The page will automatically verify their email using these parameters.

#### Manual Verification
Users can also manually enter their User ID and Secret if needed.

### 4. Features

- ✅ Automatic verification from email links
- ✅ Manual verification with form inputs
- ✅ Loading states and error handling
- ✅ Success confirmation with redirect option
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ TypeScript support

### 5. Customization

You can customize the verification flow by modifying:
- `src/app/verify/page.tsx` - Main verification page
- `src/lib/appwrite.ts` - Appwrite client configuration

### 6. Testing

To test the verification page:
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/verify`
3. Test with valid/invalid User ID and Secret combinations 