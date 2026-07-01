import { useState, type KeyboardEvent } from "react";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SkillsInput({
  value,
  onChange,
  placeholder = "Add a skill and press Enter",
  disabled = false,
}: SkillsInputProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill: string): void => {
    const normalizedSkill = skill.trim();

    if (!normalizedSkill) {
      return;
    }

    const exists = value.some(
      (existingSkill) =>
        existingSkill.toLowerCase() === normalizedSkill.toLowerCase(),
    );

    if (exists) {
      return;
    }

    onChange([...value, normalizedSkill]);

    setInputValue("");
  };

  const removeSkill = (skillToRemove: string): void => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    addSkill(inputValue);
  };

  return (
    <div className="space-y-3">
      <Input
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      {value.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {value.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}

              {!disabled ? (
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="size-4 p-0"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="size-3" />
                </Button>
              ) : null}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
