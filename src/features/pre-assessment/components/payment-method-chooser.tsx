"use client";

const PAYMENT_METHODS = [
  { id: "card", label: "Card Payment", description: "Secure card checkout when enabled." },
  { id: "interac", label: "Interac e-Transfer for Business", description: "Official business payment request." },
  { id: "eft", label: "EFT / Bank Transfer", description: "Suitable for larger business payments." },
  { id: "wire", label: "Wire Transfer", description: "Available where appropriate." },
];

export function PaymentMethodChooser({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Payment Options</p>
      {PAYMENT_METHODS.map((method) => (
        <label
          key={method.id}
          className={`flex cursor-pointer gap-3 rounded-xl border p-4 ${
            value === method.id ? "border-brand-green bg-brand-green/5" : "border-border"
          } ${disabled ? "opacity-50" : ""}`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.id}
            checked={value === method.id}
            disabled={disabled}
            onChange={() => onChange(method.id)}
            className="mt-1 accent-brand-green"
          />
          <span>
            <span className="block font-medium">{method.label}</span>
            <span className="block text-sm text-muted-foreground">{method.description}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
