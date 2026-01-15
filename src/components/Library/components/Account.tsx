import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
// import { Separator } from "../../ui/separator";
import {
  Eye,
  Download,
  CalendarDays,
  Crown,
  ShieldCheck,
  Copy,
  Check,
  User as UserIcon,
  Mail,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";

export default function Account() {
  const { user, logout } = useAuth();
  console.log(user);
  const [copied, setCopied] = useState(false);

  // ইউজার ডাটা লোড না হলে লোডিং দেখাবে
  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading account details...</p>
      </div>
    );
  }

  // লাইসেন্স কি কপি করার ফাংশন
  const copyLicenseKey = async () => {
    if (user.license?.Key) {
      try {
        await navigator.clipboard.writeText(user.license.Key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // ২ সেকেন্ড পর আবার আগের অবস্থায় ফিরে যাবে
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  // লাইসেন্স ফাইল ওপেন করার ফাংশন
  const viewLicense = () => {
    if (user.license?.fileUrl) {
      window.open(user.license.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  // লাইসেন্স ফাইল ডাউনলোড করার ফাংশন
  const downloadLicense = () => {
    if (user.license?.fileUrl) {
      const link = document.createElement("a");
      link.href = user.license.fileUrl;
      link.download = `License-${user.license.Key}.pdf`; // ফাইলের নাম সেট করা
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // নামের আদ্যক্ষর (Initials) বের করা
  const userInitials = user.fullName
    ? user.fullName
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // ডেট ফরম্যাট করার ফাংশন
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isPro = user.plan === "pro";

  return (
    <section className="p-4 md:p-8 space-y-8 overflow-y-auto h-full bg-gray-50/50">
      {/* Top Welcome Bar */}
      <Card className="border-none shadow-md bg-white overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-red-500 to-red-700"></div>
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16 border-2 border-red-100 shadow-sm">
              {/* ইউজার ইমেজ থাকলে এখানে AvatarImage বসাতে পারো */}
              <AvatarFallback className="bg-red-50 text-red-600 text-xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-2xl font-bold text-gray-900">
                Hello, {user.fullName?.split(" ")[0]}!
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Member since{" "}
                {user.license?.issueDate
                  ? new Date(user.license.issueDate).getFullYear()
                  : new Date().getFullYear()}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            Log out
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Details Section */}
        <Card className="lg:col-span-2 shadow-sm border-gray-200">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-xl">
              <UserIcon className="h-5 w-5 text-gray-500" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Manage your personal details and account role
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Full Name
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-900">
                  {user.fullName}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-900 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Account Role
                </label>
                <div>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 capitalize bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <Card className="shadow-sm border-gray-200 flex flex-col h-full">
          <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/30">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                Plan Details
              </CardTitle>
              <Badge
                variant="outline"
                className={
                  isPro
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-600 border-gray-200"
                }
              >
                {isPro ? "ACTIVE" : "FREE"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Plan</p>
              <p className="text-2xl font-bold text-gray-900">
                {isPro ? "Master Library Pro" : "Free Starter"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  <span>Started On</span>
                </div>
                <span className="font-semibold text-sm text-gray-900">
                  {user.license?.issueDate
                    ? formatDate(user.license.issueDate)
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center gap-3 text-sm text-green-700">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Expiration</span>
                </div>
                <span className="font-bold text-sm text-green-700">
                  Lifetime Access
                </span>
              </div>
            </div>

            {!isPro && (
              <div className="mt-auto pt-4">
                <Button
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md"
                  asChild
                >
                  <Link to="/pricing">Upgrade to Pro</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* License Section - Only visible for Pro users or if license exists */}
      {user.license && user.license.Key && (
        <Card className="shadow-sm border-gray-200 overflow-hidden">
          <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/30">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              Commercial License
            </CardTitle>
            <CardDescription>
              Your official license key for commercial use rights.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* License Key Display */}
              <div className="flex-1 w-full space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  License Key
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-900 text-gray-100 px-4 py-3 rounded-lg font-mono text-sm tracking-wide overflow-x-auto">
                    {user.license.Key}
                  </code>
                  <Button
                    onClick={copyLicenseKey}
                    variant="outline"
                    size="icon"
                    className="h-[46px] w-[46px] shrink-0 border-gray-200 hover:bg-gray-50"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 w-full md:w-auto pt-6 md:pt-0">
                <Button
                  onClick={viewLicense}
                  variant="outline"
                  className="gap-2 flex-1 md:flex-none border-gray-200"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  onClick={downloadLicense}
                  className="gap-2 flex-1 md:flex-none bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
