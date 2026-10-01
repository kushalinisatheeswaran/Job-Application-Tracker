"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Trash2,
  XCircle,
  Inbox,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./create-job-dialog";
import JobApplicationCard from "./job-application-card";
import { useBoard } from "@/lib/hooks/useBoards";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface KanbanBoardProps {
  board: Board;
}

interface ColConfig {
  gradient: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  {
    gradient: "from-sky-500 to-indigo-600",
    badgeBg:
      "bg-sky-500/10 text-sky-700 dark:bg-sky-400/20 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    badgeText: "text-sky-600 dark:text-sky-400",
    borderColor: "border-sky-500/30",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    gradient: "from-indigo-600 to-violet-600",
    badgeBg:
      "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-500/30",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    gradient: "from-violet-600 to-purple-600",
    badgeBg:
      "bg-violet-500/10 text-violet-700 dark:bg-violet-400/20 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    badgeText: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-500/30",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    badgeBg:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500/30",
    icon: <Award className="h-4 w-4" />,
  },
  {
    gradient: "from-rose-500 to-pink-600",
    badgeBg:
      "bg-rose-500/10 text-rose-700 dark:bg-rose-400/20 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    badgeText: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-500/30",
    icon: <XCircle className="h-4 w-4" />,
  },
];

function DroppableColumn({
  column,
  config,
  boardId,
  sortedColumns,
}: {
  column: Column;
  config: ColConfig;
  boardId: string;
  sortedColumns: Column[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];
  const jobCount = sortedJobs.length;

  return (
    <div className="w-80 flex-shrink-0 flex flex-col max-h-full">
      {/* Column Card Container */}
      <div
        className={`flex flex-col rounded-2xl border border-slate-200/80 bg-slate-100/60 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm transition-all duration-200 overflow-hidden ${
          isOver
            ? "ring-2 ring-indigo-500/50 bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-700"
            : ""
        }`}
      >
        {/* Column Header */}
        <div className="p-3.5 pb-3 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr ${config.gradient} text-white shadow-sm`}
            >
              {config.icon}
            </div>
            <h2 className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
              {column.name}
            </h2>
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${config.badgeBg}`}
            >
              {jobCount}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 rounded-lg"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-xl border-slate-200 dark:border-slate-800 p-1"
            >
              <DropdownMenuItem className="text-destructive rounded-lg text-xs font-medium cursor-pointer">
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Job Cards Drop Target Area */}
        <div
          ref={setNodeRef}
          className="p-3 space-y-3 min-h-[460px] flex-1 overflow-y-auto"
        >
          <SortableContext
            items={sortedJobs.map((job) => job._id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedJobs.map((job, key) => (
              <SortableJobCard
                key={key}
                job={{ ...job, columnId: job.columnId || column._id }}
                columns={sortedColumns}
              />
            ))}
          </SortableContext>

          {/* Empty State visual indicator if no jobs */}
          {jobCount === 0 && (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-200/80 dark:border-slate-800/80 rounded-xl my-2">
              <Inbox className="h-8 w-8 text-slate-300 dark:text-slate-600 mb-2 stroke-[1.5]" />
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                No applications here
              </p>
              <p className="text-[11px] text-slate-400/80 dark:text-slate-600">
                Drag a card or click below to add
              </p>
            </div>
          )}

          {/* Add Job Trigger Dialog */}
          <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
        </div>
      </div>
    </div>
  );
}

function SortableJobCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job._id,
    data: {
      type: "job",
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard
        job={job}
        columns={columns}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { columns, moveJob } = useBoard(board);

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let draggedJob: JobApplication | null = null;
    let sourceColumn: Column | null = null;
    let sourceIndex = -1;

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications.sort((a, b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((j) => j._id === activeId);
      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex];
        sourceColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if (!draggedJob || !sourceColumn) return;

    // Check if dropped in a column or another job
    const targetColumn = sortedColumns.find((col) => col._id === overId);
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job._id === overId);

    let targetColumnId: string;
    let newOrder: number;

    if (targetColumn) {
      targetColumnId = targetColumn._id;
      const jobsInTarget =
        targetColumn.jobApplications
          .filter((j) => j._id !== activeId)
          .sort((a, b) => a.order - b.order) || [];
      newOrder = jobsInTarget.length;
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications.some((j) => j._id === targetJob._id),
      );
      targetColumnId = targetJob.columnId || targetJobColumn?._id || "";
      if (!targetColumnId) return;

      const targetColumnObj = sortedColumns.find(
        (col) => col._id === targetColumnId,
      );

      if (!targetColumnObj) return;

      const allJobsInTargetOriginal =
        targetColumnObj.jobApplications.sort((a, b) => a.order - b.order) || [];

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j._id !== activeId) || [];

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j._id === overId,
      );

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j._id === overId,
      );

      if (targetIndexInFiltered !== -1) {
        if (sourceColumn._id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1;
          } else {
            newOrder = targetIndexInFiltered;
          }
        } else {
          newOrder = targetIndexInFiltered;
        }
      } else {
        newOrder = allJobsInTargetFiltered.length;
      }
    } else {
      return;
    }

    if (!targetColumnId) {
      return;
    }

    await moveJob(activeId, targetColumnId, newOrder);
  }

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-5 overflow-x-auto pb-6 pt-1 snap-x">
        {sortedColumns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            gradient: "from-slate-600 to-slate-800",
            badgeBg:
              "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
            badgeText: "text-slate-600 dark:text-slate-400",
            borderColor: "border-slate-300",
            icon: <Calendar className="h-4 w-4" />,
          };
          return (
            <DroppableColumn
              key={key}
              column={col}
              config={config}
              boardId={board._id}
              sortedColumns={sortedColumns}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-90 scale-105 shadow-2xl transition-transform">
            <JobApplicationCard job={activeJob} columns={sortedColumns} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
