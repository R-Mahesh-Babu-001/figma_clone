import { type ClassValue, clsx } from "clsx";
import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";

const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "/rectangle.svg",
        name: "Rectangle",
      };

    case "circle":
      return {
        icon: "/circle.svg",
        name: "Circle",
      };

    case "triangle":
      return {
        icon: "/triangle.svg",
        name: "Triangle",
      };

    case "line":
      return {
        icon: "/line.svg",
        name: "Line",
      };

    case "i-text":
      return {
        icon: "/text.svg",
        name: "Text",
      };

    case "image":
      return {
        icon: "/image.svg",
        name: "Image",
      };

    case "freeform":
      return {
        icon: "/freeform.svg",
        name: "Free Drawing",
      };

    default:
      return {
        icon: "/rectangle.svg",
        name: shapeType,
      };
  }
};

const ADMIN_EMAIL = "maheshbabur9972@gmail.com";

const getCanvasPdf = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return null;

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL();

  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

  return doc;
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result?.toString() ?? "";
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const exportToPdf = () => {
  const doc = getCanvasPdf();

  if (!doc) return;

  doc.save("canvas.pdf");
};

export const sendCanvasToAdmin = async () => {
  const doc = getCanvasPdf();

  if (!doc) return;

  const pdfBlob = doc.output("blob");
  const pdfBase64 = await blobToBase64(pdfBlob);
  const boundary = `figpro-${Date.now()}`;
  const eml = [
    `To: ${ADMIN_EMAIL}`,
    "Subject: ",
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    "",
    `--${boundary}`,
    'Content-Type: application/pdf; name="canvas.pdf"',
    'Content-Disposition: attachment; filename="canvas.pdf"',
    "Content-Transfer-Encoding: base64",
    "",
    pdfBase64.replace(/(.{76})/g, "$1\r\n"),
    `--${boundary}--`,
  ].join("\r\n");

  downloadBlob(
    new Blob([eml], { type: "message/rfc822" }),
    "send-canvas-to-admin.eml"
  );
};
