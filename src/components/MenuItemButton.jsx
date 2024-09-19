import { Button } from "@/components/ui/button";

// eslint-disable-next-line react/prop-types
export default function MenuItemButton({ icon: Icon, label, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="w-full bg-gray-800 text-white hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-start space-x-2"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );
}
