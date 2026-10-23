import { useState } from 'react'
import Icon from '../Icon.jsx'

const labelCaps = 'font-label-caps text-label-caps'

export default function DirectivesList({ tasks, addTask, toggleTask }) {
  const [taskFilter, setTaskFilter] = useState('all') // 'all' | 'high'
  const [addingTask, setAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('Executive Directive')

  const handleAddDirective = async (e) => {
    e.preventDefault()
    const trimmed = newTaskTitle.trim()
    if (!trimmed) return
    await addTask({
      title: trimmed,
      category: newTaskCategory,
      priority: 'high',
    })
    setNewTaskTitle('')
    setAddingTask(false)
  }

  const filteredTasks =
    taskFilter === 'high' ? tasks.filter((t) => t.priority === 'high') : tasks

  const highPriorityCount = tasks.filter((t) => t.priority === 'high').length
  const completedCount = tasks.filter((t) => t.done).length

  return (
    <div className="lg:col-span-7 flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="assignment" className="text-primary text-[22px]" />
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Host Directives &amp; Automated Triggers
          </h2>
          <span className={`${labelCaps} text-on-surface-variant ml-1`}>
            ({completedCount}/{tasks.length} Done)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface-container-low/80 p-0.5 rounded-xl border border-white/[0.05]">
            <button
              type="button"
              onClick={() => setTaskFilter('all')}
              className={`px-3 py-1 rounded-lg ${labelCaps} uppercase transition-all cursor-pointer ${
                taskFilter === 'all'
                  ? 'bg-surface-container-highest text-primary font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setTaskFilter('high')}
              className={`px-3 py-1 rounded-lg ${labelCaps} uppercase transition-all cursor-pointer ${
                taskFilter === 'high'
                  ? 'bg-surface-container-highest text-secondary-fixed font-semibold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              High Impact ({highPriorityCount})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAddingTask((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary border border-primary/25 font-label-md text-label-md transition-all cursor-pointer"
          >
            <Icon name={addingTask ? 'close' : 'add'} className="text-[16px]" />
            <span className="hidden sm:inline">
              {addingTask ? 'Cancel' : 'Add Directive'}
            </span>
          </button>
        </div>
      </div>

      {/* Add Directive Form Drawer */}
      {addingTask && (
        <form
          onSubmit={handleAddDirective}
          className="p-4 rounded-2xl bg-surface-container border border-primary/30 shadow-xl flex flex-col gap-3 animate-scale-in"
        >
          <div className="flex items-center justify-between">
            <span className={`${labelCaps} text-secondary-fixed uppercase tracking-wider`}>
              Dispatch Field Directive
            </span>
            <span className="text-on-surface-variant text-[11px]">
              AI Auto-Assigned &amp; Logged to Firestore
            </span>
          </div>
          <input
            type="text"
            required
            placeholder="e.g. Schedule private sommelier decanting for reserve cabernet"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:border-primary"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <label htmlFor="directiveCategory" className="text-on-surface-variant text-[12px]">Category:</label>
              <select
                id="directiveCategory"
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-surface-container-high border border-outline-variant/20 text-on-surface text-[12px] focus:outline-none"
              >
                <option value="Culinary Team">Culinary Team</option>
                <option value="Sound Architect">Sound Architect</option>
                <option value="Spatial Layout">Spatial Layout</option>
                <option value="Lighting Design">Lighting Design</option>
                <option value="Logistics Enclave">Logistics Enclave</option>
                <option value="Executive Directive">Executive Directive</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md font-semibold shadow-md hover:brightness-110 cursor-pointer"
            >
              Commit Directive
            </button>
          </div>
        </form>
      )}

      {/* Task Directive Cards */}
      <div className="flex flex-col gap-3">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className={`p-4 sm:p-5 rounded-2xl aura-surface-card hover:bg-surface-container-high/90 transition-all duration-200 cursor-pointer flex items-start gap-4 group ${
              t.done ? 'opacity-65' : ''
            }`}
          >
            {/* Interactive Checkbox */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleTask(t.id)
              }}
              aria-label={t.done ? `Mark ${t.title} as pending` : `Mark ${t.title} as completed`}
              className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                t.done
                  ? 'bg-secondary-fixed border-secondary-fixed text-on-secondary-fixed'
                  : 'border-outline-variant/50 hover:border-secondary-fixed group-hover:scale-105'
              }`}
            >
              {t.done && <Icon name="check" className="text-[16px] font-bold" />}
            </button>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`font-label-lg text-label-lg font-semibold text-on-surface truncate ${
                    t.done ? 'line-through text-outline' : ''
                  }`}
                >
                  {t.title}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full ${labelCaps} uppercase shrink-0 ${t.dueCls}`}
                >
                  {t.due}
                </span>
              </div>
              <p
                className={`font-body-md text-body-md leading-relaxed ${
                  t.done ? 'text-outline' : 'text-on-surface-variant'
                }`}
              >
                {t.desc}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-outline text-[12px]">
                {t.meta?.map((m, idx) => (
                  <span
                    key={idx}
                    className={`flex items-center gap-1 ${m.cls || ''}`}
                  >
                    <Icon name={m.icon} className="text-[15px]" />
                    <span>{m.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
