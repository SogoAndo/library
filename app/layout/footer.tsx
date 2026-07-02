export default function Footer() {
  return (
    <footer className="mt-auto border-t border-green-200 bg-green-100 p-4 text-center text-sm text-green-900 shadow-inner">
      &copy; {new Date().getFullYear()} Fullness,Inc. All Rights Reserved.
    </footer>
  );
}
