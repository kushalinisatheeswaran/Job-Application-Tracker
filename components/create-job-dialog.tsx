"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
      } else {
        console.error("Failed to create job: ", result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-center text-xs font-semibold text-slate-600 dark:text-slate-400 border-dashed border-2 border-slate-300/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:border-indigo-700 dark:hover:text-indigo-400 dark:hover:bg-indigo-950/30 rounded-xl h-10 transition-all cursor-pointer shadow-2xs"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Job Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-2xl p-6 shadow-2xl border-slate-200 dark:border-slate-800">
        <DialogHeader className="space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            Add Job Application
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Track a new job opportunity in this column.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="create-company"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="create-company"
                  required
                  placeholder="e.g. Stripe, Vercel, Google"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="create-position"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Position Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="create-position"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="create-location"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Location
                </Label>
                <Input
                  id="create-location"
                  placeholder="e.g. Remote, San Francisco, CA"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="create-salary"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Salary / Compensation
                </Label>
                <Input
                  id="create-salary"
                  placeholder="e.g. $120k - $150k"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="create-jobUrl"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Job Posting URL
                </Label>
                <Input
                  id="create-jobUrl"
                  type="url"
                  placeholder="https://company.com/careers/job"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="create-tags"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Tags{" "}
                  <span className="text-slate-400 font-normal">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  id="create-tags"
                  placeholder="React, Next.js, Full Time"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="create-description"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Role Summary
              </Label>
              <Textarea
                id="create-description"
                rows={2}
                placeholder="Brief summary or key requirements..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950 resize-none text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="create-notes"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Interview & Process Notes
              </Label>
              <Textarea
                id="create-notes"
                rows={3}
                placeholder="Recruiter contact, interview questions, follow-up dates..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:bg-white dark:focus:bg-slate-950 resize-none text-sm"
              />
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-10 px-5 rounded-xl border-slate-200 dark:border-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500"
            >
              Add Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
