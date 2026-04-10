"use client"
import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function ToastProvider(props: React.ComponentProps<typeof ToastPrimitive.Provider>) {
    return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

const ToastViewport = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitive.Viewport
        ref={ref}
        data-slot="toast-viewport"
        className={cn(
            "fixed top-4 left-1/2 z-[100] flex max-h-screen w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 p-4",
            className
        )}
        {...props}
    />
))
ToastViewport.displayName = "ToastViewport"

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-top-full data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
    {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive:
                    "border-destructive bg-destructive text-destructive-foreground",
                success: "border-green-500 bg-green-500/80 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root
        ref={ref}
        data-slot="toast"
        className={cn(toastVariants({ variant }), className)}
        {...props}
    />
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
    <ToastPrimitive.Title
        ref={ref}
        data-slot="toast-title"
        className={cn("text-sm font-semibold", className)}
        {...props}
    />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
    <ToastPrimitive.Description
        ref={ref}
        data-slot="toast-description"
        className={cn("text-sm opacity-90", className)}
        {...props}
    />
))
ToastDescription.displayName = "ToastDescription"

const ToastAction = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Action>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
    <ToastPrimitive.Action
        ref={ref}
        data-slot="toast-action"
        className={cn(
            "inline-flex h-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50",
            className
        )}
        {...props}
    />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
    React.ElementRef<typeof ToastPrimitive.Close>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
    <ToastPrimitive.Close
        ref={ref}
        data-slot="toast-close"
        className={cn(
            "absolute right-2 top-2 rounded-md p-1 text-white/80 opacity-0 transition-opacity hover:text-white focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        )}
        {...props}
    >
        <X className="size-4" />
    </ToastPrimitive.Close>
))
ToastClose.displayName = "ToastClose"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
}