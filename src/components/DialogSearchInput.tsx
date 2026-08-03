import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder="Type to search..."
          className="w-50 text-xs"
          readOnly
          onClick={() => setOpen(true)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* 弹出的大搜索框 */}
      <DialogContent
        showCloseButton={false}
        className="top-8 -translate-y-0 sm:max-w-xl! rounded-3xl"
      >
        <div className="flex items-center gap-3">
          <SearchIcon className="size-5 shrink-0 text-muted-foreground" />
          <Input
            placeholder="搜索文章…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 border-0 bg-transparent text-lg shadow-none focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen(false)}
          ></Button>
        </div>

        {/* 搜索结果区域（预留） */}
        {/*{query && (*/}
        {/*  <div className="min-h-20 border-t border-border pt-4 text-sm text-muted-foreground">*/}
        {/*    搜索 "{query}" 的结果将显示在这里…*/}
        {/*  </div>*/}
        {/*)}*/}
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
