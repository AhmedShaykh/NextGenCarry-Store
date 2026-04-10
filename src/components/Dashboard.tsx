"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    LV_API,
    GUCCI_API,
    CHANEL_API,
    DIOR_API,
    PRADA_API,
    HERMES_API,
    BALENCIAGA_API,
    NIKE_API,
    ADIDAS_API,
    FENDI_API,
    YSL_API,
    CELINE_API,
    VALENTINO_API,
    ROLEX_API
} from "@/services/brandsApi";

const productSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
    title: z.string().min(1, "Title is required"),
    desc: z.string().min(1, "Description is required")
});

type ProductFormData = z.infer<typeof productSchema>;

const brands = [
    { value: "LV", label: "Louis Vuitton" },
    { value: "GUCCI", label: "Gucci" },
    { value: "CHANEL", label: "Chanel" },
    { value: "DIOR", label: "Dior" },
    { value: "PRADA", label: "Prada" },
    { value: "HERMES", label: "Hermès" },
    { value: "BALENCIAGA", label: "Balenciaga" },
    { value: "NIKE", label: "Nike" },
    { value: "ADIDAS", label: "Adidas" },
    { value: "FENDI", label: "Fendi" },
    { value: "YSL", label: "YSL" },
    { value: "CELINE", label: "Celine" },
    { value: "VALENTINO", label: "Valentino" },
    { value: "ROLEX", label: "Rolex" },
];

const categories = [
    { value: "LUXURY_HANDBAGS", label: "Luxury Handbags" },
    { value: "SHOES_HEELS", label: "Shoes & Heels" },
    { value: "TRAVELING_BAGS", label: "Traveling Bags" },
    { value: "JEWELRY", label: "Jewelry" },
    { value: "CLOTHING", label: "Clothing" },
    { value: "PURSE", label: "Purse" },
    { value: "WATCHES", label: "Watches" },
    { value: "BELTS", label: "Belts" },
    { value: "SUNGLASSES", label: "Sunglasses" },
    { value: "SUITCASE", label: "Suitcase" },
    { value: "JACKETS", label: "Jackets" },
];

const brandToApi: Record<string, (formData: any) => Promise<any>> = {
    LV: LV_API,
    GUCCI: GUCCI_API,
    CHANEL: CHANEL_API,
    DIOR: DIOR_API,
    PRADA: PRADA_API,
    HERMES: HERMES_API,
    BALENCIAGA: BALENCIAGA_API,
    NIKE: NIKE_API,
    ADIDAS: ADIDAS_API,
    FENDI: FENDI_API,
    YSL: YSL_API,
    CELINE: CELINE_API,
    VALENTINO: VALENTINO_API,
    ROLEX: ROLEX_API
};

const ProductForm = ({ onSuccess }: { onSuccess: () => void }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            brand: "",
            category: "",
            imageUrl: "",
            title: "",
            desc: ""
        }
    });

    const onSubmit = async (data: ProductFormData) => {

        const apiFunc = brandToApi[data.brand];

        if (!apiFunc) {

            toast.error("Invalid Brand Selected");

            return;

        }

        const formData = {
            title: data.title,
            desc: data.desc,
            imageUrl: data.imageUrl,
            category: data.category
        };

        try {

            await apiFunc(formData);

            toast.success("✅ Item created successfully!");

            onSuccess();

        } catch (err: any) {

            console.error("Submission error:", err);

            const errorMessage = err.response?.data?.message || err.message || "Failed to create item. Please try again.";

            if (errorMessage.includes("ImageUrl Already Exists") || errorMessage.includes("P2002")) {

                toast.error("❌ This Image URL is already used.\nPlease use a different image link.");

            } else {

                toast.error(`❌ ${errorMessage}`);

            }

        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="brand">Brand</FieldLabel>

                    <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="border-gray-600 focus:border-blue-500">
                                    <SelectValue placeholder="Select Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.value} value={brand.value}>
                                            {brand.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.brand && (
                        <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>

                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="border-gray-600 focus:border-blue-500">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>

                    <Input
                        id="imageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...register("imageUrl")}
                        className="border-gray-600 focus:border-blue-500"
                        disabled={isSubmitting}
                    />

                    {errors.imageUrl && (
                        <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>

                    <Input
                        id="title"
                        type="text"
                        placeholder="Product title"
                        {...register("title")}
                        className="border-gray-600 focus:border-blue-500"
                        disabled={isSubmitting}
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="desc">Description</FieldLabel>

                    <Textarea
                        id="desc"
                        placeholder="Product description..."
                        rows={4}
                        {...register("desc")}
                        className="border-gray-600 focus:border-blue-500 resize-y"
                        disabled={isSubmitting}
                    />

                    {errors.desc && (
                        <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
                    )}
                </Field>

                <Field>
                    <Button
                        type="submit"
                        className="w-full font-bold py-5 cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin inline-block w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"></span>
                                Submitting...
                            </>
                        ) : (
                            "Submit Item"
                        )}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
};

const Dashboard = () => {

    const [formKey, setFormKey] = useState(0);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <Card className="py-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Add New Product Item
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <ProductForm
                            key={formKey}
                            onSuccess={() => setFormKey(prev => prev + 1)}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;