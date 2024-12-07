"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FrontMatter } from "@/interfaces/posts-interface";
import { useCallback, useEffect, useState } from "react";
import SearchButton from "./SearchButton";
import Link from "next/link";

interface BlogSearchDialogProps {
  allFrontMatters: FrontMatter[];
}

export default function BlogSearchDialog({
  allFrontMatters,
}: BlogSearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<FrontMatter[]>([]);

  const openSearchDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        openSearchDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSearchDialog]);

  // Search filtering
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allFrontMatters.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowercasedQuery) ||
        blog.summary.toLowerCase().includes(lowercasedQuery),
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, allFrontMatters]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <SearchButton onClick={openSearchDialog} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Search Blogs</DialogTitle>
            <DialogDescription>
              Start typing to search through blog posts. Press Esc to close.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex w-full items-center justify-around gap-20">
              <Label htmlFor="search" className="text-right">
                Search
              </Label>
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="col-span-3"
                placeholder="Enter search terms..."
                autoFocus
              />
            </div>
          </div>
          <div className="mt-4 max-h-[300px] overflow-y-auto">
            {filteredBlogs.length > 0 ? (
              <ul className="space-y-2">
                {filteredBlogs.map((blog) => (
                  <li key={blog.slug} className="border-b pb-2">
                    <Link href={`/${blog.slug}`}>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="truncate text-sm text-gray-600">
                        {blog.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No matching blogs found.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
