import React from "react";
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
import { Separator } from "../../ui/separator";
import { Eye, Download, CalendarDays, Crown, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthProvider";

// NOTE: Adjust the import paths above to match your shadcn/ui setup if different.

export default function Account() {
  // Mocked user data — replace with real data from your store/API
  // const { user } = useAuth;
  // const data = user.data;
  const user = {
    name: "Ankit Pandy",
    email: "ankit@example.com",
    image: "https://i.pravatar.cc/160?img=5",
    plan: {
      name: "light",
      status: "expired", // "active" | "grace" | "expired"
      startedOn: new Date("2025-09-09"),
      // renewsOn: new Date("2025-11-12"),
      expiresOn: new Date("2025-11-12"),
    },
    license: {
      key: "LIC-2X7F-9K2M-ABCD-2YQ9",
      fileUrl: "/licenses/LIC-2X7F-9K2M-ABCD-2YQ9.pdf",
    },
  };

  const today = new Date();
  const niceDate = (d: Date | undefined) =>
    d?.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const statusTone =
    {
      active: "text-green-700 bg-green-100 border-green-200",
      grace: "text-amber-700 bg-amber-100 border-amber-200",
      expired: "text-red-700 bg-red-100 border-red-200",
    }[user.plan.status] || "text-slate-700 bg-slate-100 border-slate-200";

  //   const copyLicense = async () => {
  //     try {
  //       await navigator.clipboard.writeText(user.license.key);
  //       // If you have a toast system, fire it here
  //       // toast.success("License key copied");
  //       console.log("License key copied");
  //     } catch (e) {
  //       console.error("Copy failed", e);
  //     }
  //   };

  const viewLicense = () => {
    window.open(user.license.fileUrl, "_blank", "noopener,noreferrer");
  };

  const downloadLicense = () => {
    const a = document.createElement("a");
    a.href = user.license.fileUrl;
    a.download = `${user.license.key}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="p-4 md:p-6 space-y-6 overflow-y-auto">
      {/* Top Welcome Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4 md:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-semibold leading-none">
                Welcome {user.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {today.toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button variant="secondary">Log out</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Basic information about your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-1">
                    Full name
                  </p>
                  <p className="text-base font-medium">{user.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs uppercase text-muted-foreground mb-1">
                    Email
                  </p>
                  <p className="text-base font-medium break-all">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex md:justify-end">
                <Avatar className="h-28 w-28 ring-2 ring-muted/40">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-4 w-4" /> Subscription
              </CardTitle>
              <Badge variant="outline" className={`${statusTone} border`}>
                {user.plan.status}
              </Badge>
            </div>
            <CardDescription>
              Your membership and billing status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{user.plan.name}</p>
              </div>
              <Badge variant="secondary">Member</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> Started
                </p>
                <p className="text-sm font-medium">
                  {niceDate(user.plan.startedOn)}
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> Expires
                </p>
                <p className="text-sm font-medium">
                  {niceDate(user.plan.expiresOn)}
                </p>
              </div>
              {/* <div className="rounded-lg border p-3 col-span-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5"/> </p>
                <p className="text-sm font-medium">{niceDate(user.plan.)}</p>
              </div> */}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="default">
                <Link to={"/pricing"}>Manage subscription</Link>
              </Button>
              <Button variant="outline">Upgrade</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* License Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> License
          </CardTitle>
          <CardDescription>
            View or download your license document
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* <div className="flex items-center gap-3">
              <code className="rounded bg-muted px-2 py-1 text-sm font-mono">{user.license.key}</code>
              <Button type="button" variant="ghost" size="sm" onClick={copyLicense} className="gap-1">
                <Copy className="h-4 w-4"/> Copy
              </Button>
            </div> */}
            <div className="flex gap-3">
              <Button type="button" onClick={viewLicense} className="gap-2">
                <Eye className="h-4 w-4" /> View License
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={downloadLicense}
                className="gap-2"
              >
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "../../ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "../../ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import { Badge } from "../../ui/badge";
// import { Separator } from "../../ui/separator";
// import {
//   Eye,
//   Download,
//   CalendarDays,
//   Crown,
//   ShieldCheck,
//   Edit,
//   Camera,
//   Loader2, // Loading icon
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthProvider"; // Import useAuth
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogClose,
// } from "../../ui/dialog";
// import { Input } from "../../ui/input";
// import { Label } from "../../ui/label";
// import { Skeleton } from "../../ui/skeleton"; // Skeleton for loading

// // JSON data'r structure define korchi
// interface AccountDetails {
//   email: string;
//   plan: {
//     name: string;
//     status: "active" | "grace" | "expired";
//     startedOn: string;
//     expiresOn: string;
//   };
//   license: {
//     key: string;
//     fileUrl: string;
//   };
//   image: string;
// }

// export default function Account() {
//   // 1. Auth data (logged-in user)
//   const { user, logout } = useAuth();

//   // 2. State for JSON data
//   const [details, setDetails] = useState<AccountDetails | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 3. State for Edit Form
//   const [editName, setEditName] = useState(user?.name || "");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // 4. Data fetch korar jonno useEffect
//   useEffect(() => {
//     const fetchAccountDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("/accountDetails.json");
//         const data: AccountDetails = await response.json();
//         // Simulating fetching details for the logged-in user
//         if (data.email === user?.email) {
//           setDetails(data);
//           setPreview(data.image); // Set initial preview image
//         }
//       } catch (err) {
//         console.error("Failed to fetch account details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchAccountDetails();
//     }
//   }, [user?.email]);

//   const today = new Date();
//   const niceDate = (d: string | undefined) =>
//     d
//       ? new Date(d).toLocaleDateString(undefined, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })
//       : "";

//   const statusMap: Record<AccountDetails['plan']['status'], string> = {
//     active: "text-green-700 bg-green-100 border-green-200",
//     grace: "text-amber-700 bg-amber-100 border-amber-200",
//     expired: "text-red-700 bg-red-100 border-red-200",
//   };

//   const statusTone =
//     details ? statusMap[details.plan.status] : "text-slate-700 bg-slate-100 border-slate-200";

//   // --- Edit Form Handlers ---
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsUpdating(true);
//     // --- MOCK UPDATE ---
//     console.log("Updating profile with:", {
//       name: editName,
//       file: selectedFile,
//     });
//     // Simulating API call
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setIsUpdating(false);
//     // Ekhane real app e 'user' context update kora hoto
//     // Abong dialog close kora hoto (DialogClose button click kore)
//   };

//   const viewLicense = () => {
//     if (details)
//       window.open(details.license.fileUrl, "_blank", "noopener,noreferrer");
//   };

//   const downloadLicense = () => {
//     if (details) {
//       const a = document.createElement("a");
//       a.href = details.license.fileUrl;
//       a.download = `${details.license.key}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     }
//   };

//   if (!user || loading) {
//     return (
//       <section className="p-4 md:p-6 space-y-6 overflow-y-auto">
//         <Skeleton className="h-24 w-full" />
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Skeleton className="lg:col-span-2 h-48" />
//           <Skeleton className="h-48" />
//         </div>
//         <Skeleton className="h-32 w-full" />
//       </section>
//     );
//   }

//   const userFallback = user.name
//     .split(" ")
//     .map((n) => n[0])
//     .join("");

//   return (
//     <section className="p-4 md:p-6 space-y-6 overflow-y-auto">
//       {/* Top Welcome Bar */}
//       <Card className="border shadow-sm">
//         <CardContent className="p-4 md:p-6 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-14 w-14">
//               <AvatarImage src={preview || details?.image} alt={user.name} />
//               <AvatarFallback>{userFallback}</AvatarFallback>
//             </Avatar>
//             <div className="flex flex-col">
//               <span className="text-xl md:text-2xl font-semibold leading-none">
//                 Welcome {user.name}
//               </span>
//               <span className="text-sm text-muted-foreground">
//                 {today.toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//           <Button variant="secondary" onClick={logout}>
//             Log out
//           </Button>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Profile Details */}
//         <Card className="lg:col-span-2">
//           <CardHeader className="pb-2">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>Profile</CardTitle>
//                 <CardDescription>
//                   Basic information about your account
//                 </CardDescription>
//               </div>

//               {/* --- EDIT PROFILE DIALOG (Shadcn) --- */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md text-black">
//                   <DialogHeader>
//                     <DialogTitle className="text-2xl font-bold text-black">
//                       Edit Profile
//                     </DialogTitle>
//                   </DialogHeader>
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Profile Picture Editor */}
//                     <div className="flex flex-col items-center space-y-3">
//                       <Label>Profile Picture</Label>
//                       <div className="relative">
//                         <Avatar className="h-32 w-32">
//                           <AvatarImage
//                             src={preview || details?.image}
//                             alt={user.name}
//                           />
//                           <AvatarFallback className="text-4xl">
//                             {userFallback}
//                           </AvatarFallback>
//                         </Avatar>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           className="absolute bottom-1 right-1 rounded-full bg-white shadow-md"
//                           onClick={() => fileInputRef.current?.click()}
//                         >
//                           <Camera className="h-4 w-4" />
//                         </Button>
//                         <Input
//                           type="file"
//                           ref={fileInputRef}
//                           onChange={handleFileChange}
//                           className="hidden"
//                           accept="image/png, image/jpeg"
//                         />
//                       </div>
//                     </div>

//                     {/* Name Editor */}
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name</Label>
//                       <Input
//                         id="name"
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     <DialogFooter className="pt-4">
//                       <DialogClose asChild>
//                         <Button type="button" variant="ghost">
//                           Cancel
//                         </Button>
//                       </DialogClose>
//                       <Button type="submit" disabled={isUpdating}>
//                         {isUpdating && (
//                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         )}
//                         {isUpdating ? "Saving..." : "Save Changes"}
//                       </Button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//               {/* --- END OF DIALOG --- */}
//             </div>
//           </CardHeader>
//           <CardContent className="p-4 md:p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2 space-y-4">
//                 <div>
//                   <p className="text-xs uppercase text-muted-foreground mb-1">
//                     Full name
//                   </p>
//                   <p className="text-base font-medium">{user.name}</p>
//                 </div>
//                 <Separator />
//                 <div>
//                   <p className="text-xs uppercase text-muted-foreground mb-1">
//                     Email
//                   </p>
//                   <p className="text-base font-medium break-all">
//                     {user.email}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex md:justify-end">
//                 <Avatar className="h-28 w-28 ring-2 ring-muted/40">
//                   <AvatarImage
//                     src={preview || details?.image}
//                     alt={user.name}
//                   />
//                   <AvatarFallback className="text-xl">
//                     {userFallback}
//                   </AvatarFallback>
//                 </Avatar>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Subscription */}
//         {details && (
//           <Card>
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center gap-2">
//                   <Crown className="h-4 w-4" /> Subscription
//                 </CardTitle>
//                 <Badge variant="outline" className={`${statusTone} border`}>
//                   {details.plan.status}
//                 </Badge>
//               </div>
//               <CardDescription>
//                 Your membership and billing status
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="p-4 md:p-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Plan</p>
//                   <p className="font-medium">{details.plan.name}</p>
//                 </div>
//                 <Badge variant="secondary">Member</Badge>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="rounded-lg border p-3">
//                   <p className="text-xs text-muted-foreground flex items-center gap-1">
//                     <CalendarDays className="h-3.5 w-3.5" /> Started
//                   </p>
//                   <p className="text-sm font-medium">
//                     {niceDate(details.plan.startedOn)}
//                   </p>
//                 </div>
//                 <div className="rounded-lg border p-3">
//                   <p className="text-xs text-muted-foreground flex items-center gap-1">
//                     <CalendarDays className="h-3.5 w-3.5" /> Expires
//                   </p>
//                   <p className="text-sm font-medium">
//                     {niceDate(details.plan.expiresOn)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 pt-2">
//                 <Button variant="default">
//                   <Link to={"/pricing"}>Manage subscription</Link>
//                 </Button>
//                 <Button variant="outline">Upgrade</Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* License Section */}
//       {details && (
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="flex items-center gap-2">
//               <ShieldCheck className="h-4 w-4" /> License
//             </CardTitle>
//             <CardDescription>
//               View or download your license document
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-4 md:p-6 space-y-2">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//               <div className="flex gap-3">
//                 <Button type="button" onClick={viewLicense} className="gap-2">
//                   <Eye className="h-4 w-4" /> View License
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={downloadLicense}
//                   className="gap-2"
//                 >
//                   <Download className="h-4 w-4" /> Download
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </section>
//   );
// }
