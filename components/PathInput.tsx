import { FiCheck, FiX, FiLoader } from "react-icons/fi"

export default function PathInput({
  path,
  baseUrl,
  allChecking,
  checkPaths,
  updatePaths,
}: {
  path: Path
  baseUrl: string
  allChecking: boolean
  checkPaths: () => void
  updatePaths: (path: Path) => void
}) {
  return (
    <div className="mt-4 flex  items-center gap-2">
      <div className="text-sm font-light text-gray-400">{baseUrl}</div>
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="url"
            className="block w-96 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={path.value}
            onChange={(e) =>
              updatePaths({ ...path, value: e.currentTarget.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkPaths()
              }
            }}
          />
          <div className="absolute right-2.5 top-2.5 rounded-md border border-gray-200 bg-white/80 p-0.5">
            {allChecking && <FiLoader className="animate-spin" />}
            {!allChecking && path.status === "success" && <FiCheck />}
            {!allChecking && path.status === "error" && <FiX color="red" />}
          </div>
        </div>
      </div>
    </div>
  )
}
