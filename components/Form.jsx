import Link from "next/link";

const Form = ({ type, doc, setDoc, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Document</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share projects with the world, and let your imagination run
        wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div class="flex-col items-center justify-center w-full">
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Insert Your Project
          </span>
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 mt-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                PDF, PNG, JPG
              </p>
            </div>
            <input
              onChange={(e) => setDoc({ ...doc, file: e.target.value })}
              type="file"
              id="dropzone-file"
              class="hidden"
              value={doc.file}
            />
          </label>
        </div>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Document{" "}
            <span className="font-normal">
              (#pj, #eletrica, #camacari, etc.)
            </span>
          </span>
          <input
            value={doc.tag}
            onChange={(e) => setDoc({ ...doc, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
