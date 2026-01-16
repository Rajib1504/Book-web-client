import React, {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
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
  Pencil,
  X,
  Phone,
  FileText,
  Camera,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";

export default function Account() {
  const { user, logout, updateUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    description: user?.description || "",
  });

  // Update effect to keep formData in sync if user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        description: user.description || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e?: FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.put("/users/profile", formData);
      if (data.status) {
        toast.success(data.message || "Profile updated successfully!");
        updateUser(data.data);
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate if it's an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, etc.)");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);
    if (user?.id) {
      formData.append("user_id", user.id);
    }

    setIsUploading(true);
    try {
      const { data } = await axiosInstance.post(
        "/users/updateprofilepic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.status) {
        toast.success(data.message || "Profile picture updated!");
        updateUser(data.data.user);
      } else {
        toast.error(data.message || "Failed to update profile picture.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

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
    if (user.license?.fileUrl && user.license?.Key) {
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
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              <Avatar className="h-16 w-16 border-2 border-red-100 shadow-sm overflow-hidden bg-white">
                <AvatarImage
                  src={user.profilePic}
                  alt={user.fullName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-red-50 text-red-600 text-xl font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              {/* Overlay with Camera Icon */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>

              {/* Mini corner indicator */}
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                <Camera className="h-3 w-3 text-red-600" />
              </div>
            </div>
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
          <CardHeader className="pb-4 border-b border-gray-100 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserIcon className="h-5 w-5 text-gray-500" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Manage your personal details and account role
              </CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2 border-gray-200"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpdateProfile}
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={formData.fullName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="bg-white"
                    placeholder="Enter full name"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-900">
                    {user.fullName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-500 flex items-center gap-2 italic">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {user.email} (Read-only)
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={formData.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="pl-10 bg-white"
                      placeholder="Enter phone number"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {user.phone || "No phone added"}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Bio / Description
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="pl-10 bg-white min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 font-medium text-gray-900 min-h-[60px]">
                    {user.description || "No description provided."}
                  </div>
                )}
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
