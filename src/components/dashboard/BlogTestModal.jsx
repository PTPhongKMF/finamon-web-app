import { useState } from "react";
import { kyAspDotnet } from "../../api/ky";
import { getAllBlogs, updateBlog, deleteBlog } from "../../api/blogApi";
import { X } from "lucide-react";

function BlogTestModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testCreateBlog = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const tests = [];

    try {
      // Test 1: Simple JSON request
      console.log("Testing JSON request...");
      try {
        const jsonResponse = await kyAspDotnet
          .post("api/blog", {
            json: {
              title: "Test Blog JSON",
              content: "This is a test blog post using JSON",
            },
          })
          .json();

        setResult({ type: "JSON Success", data: jsonResponse });
        return;
      } catch (jsonErr) {
        console.log("JSON request failed:", jsonErr);
        let jsonErrorMsg = jsonErr.message;

        if (jsonErr.response) {
          const errorText = await jsonErr.response.text();
          console.log("JSON error response:", errorText);
          jsonErrorMsg = `${jsonErr.response.status}: ${errorText}`;
        }
        tests.push({ type: "JSON", error: jsonErrorMsg });
      }

      // Test 2: FormData without file
      console.log("Testing FormData without file...");
      try {
        const formData = new FormData();
        formData.append("title", "Test Blog FormData");
        formData.append("content", "This is a test blog post using FormData");

        const formResponse = await kyAspDotnet
          .post("api/blog", {
            body: formData,
          })
          .json();

        setResult({ type: "FormData Success", data: formResponse });
        return;
      } catch (formErr) {
        console.log("FormData request failed:", formErr);
        let formErrorMsg = formErr.message;

        if (formErr.response) {
          const errorText = await formErr.response.text();
          console.log("FormData error response:", errorText);
          formErrorMsg = `${formErr.response.status}: ${errorText}`;
        }
        tests.push({ type: "FormData", error: formErrorMsg });
      }

      // Test 3: Check if we can GET blogs first
      console.log("Testing GET blogs...");
      try {
        const getResponse = await kyAspDotnet.get("api/blog").json();
        tests.push({
          type: "GET Success",
          data: `Found ${
            Array.isArray(getResponse) ? getResponse.length : "unknown"
          } blogs`,
        });
      } catch (getErr) {
        let getErrorMsg = getErr.message;
        if (getErr.response) {
          const errorText = await getErr.response.text();
          getErrorMsg = `${getErr.response.status}: ${errorText}`;
        }
        tests.push({ type: "GET", error: getErrorMsg });
      }

      // Show all test results
      setError(
        `All tests failed:\n${tests
          .map((t) => `${t.type}: ${t.error || t.data}`)
          .join("\n")}`
      );
    } catch (err) {
      console.error("Test failed:", err);
      setError(`Test failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetBlogs = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const tests = [];

    try {
      // Test 1: Using getAllBlogs function
      console.log("Testing GET blogs using getAllBlogs function...");
      try {
        const blogs = await getAllBlogs();
        tests.push({
          method: "getAllBlogs()",
          success: true,
          count: blogs.length,
          data: blogs.slice(0, 2),
        });
      } catch (err) {
        tests.push({
          method: "getAllBlogs()",
          success: false,
          error: err.message,
        });
      }

      // Test 2: Direct API call
      console.log("Testing direct GET api/blog...");
      try {
        const directResponse = await kyAspDotnet.get("api/blog").json();
        tests.push({
          method: "Direct GET api/blog",
          success: true,
          count: Array.isArray(directResponse)
            ? directResponse.length
            : "Not array",
          data: Array.isArray(directResponse)
            ? directResponse.slice(0, 2)
            : directResponse,
        });
      } catch (err) {
        tests.push({
          method: "Direct GET api/blog",
          success: false,
          error: err.message,
        });
      }

      // Test 3: Try with specific blog ID
      console.log("Testing GET specific blog (ID 7)...");
      try {
        const specificBlog = await kyAspDotnet.get("api/blog/7").json();
        tests.push({
          method: "GET api/blog/7",
          success: true,
          data: specificBlog,
        });
      } catch (err) {
        tests.push({
          method: "GET api/blog/7",
          success: false,
          error: err.message,
        });
      }

      // Test 4: Try alternative endpoints
      const alternativeEndpoints = ["api/blogs", "api/Blog", "api/Blogs"];

      for (const endpoint of alternativeEndpoints) {
        console.log(`Testing GET ${endpoint}...`);
        try {
          const altResponse = await kyAspDotnet.get(endpoint).json();
          tests.push({
            method: `GET ${endpoint}`,
            success: true,
            count: Array.isArray(altResponse)
              ? altResponse.length
              : "Not array",
            data: Array.isArray(altResponse)
              ? altResponse.slice(0, 1)
              : altResponse,
          });
        } catch (err) {
          tests.push({
            method: `GET ${endpoint}`,
            success: false,
            error: err.message,
          });
        }
      }

      setResult({
        type: "GET Tests Complete",
        data: tests,
      });
    } catch (err) {
      console.error("GET blogs test failed:", err);
      setError(`GET blogs failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testUpdateBlog = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test updating blog ID 7 (latest one)
      const updateData = {
        title: "Updated Test Blog",
        content: "This blog has been updated via API test",
      };

      console.log("Testing UPDATE blog ID 7...");
      const response = await updateBlog(7, updateData);

      setResult({
        type: "UPDATE Success",
        data: response,
        message: "Blog ID 7 updated successfully",
      });
    } catch (err) {
      console.error("UPDATE blog test failed:", err);
      setError(`UPDATE blog failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testDeleteBlog = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Test deleting blog ID 1 (oldest one)
      console.log("Testing DELETE blog ID 1...");
      const response = await deleteBlog(1);

      setResult({
        type: "DELETE Success",
        data: response,
        message: "Blog ID 1 deleted successfully",
      });
    } catch (err) {
      console.error("DELETE blog test failed:", err);
      setError(`DELETE blog failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">API Test</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <button
              onClick={testGetBlogs}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test GET Blogs"}
            </button>

            <button
              onClick={testCreateBlog}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test Blog Creation"}
            </button>

            <button
              onClick={testUpdateBlog}
              disabled={loading}
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test UPDATE Blog (ID 7)"}
            </button>

            <button
              onClick={testDeleteBlog}
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test DELETE Blog (ID 1)"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
              <strong>{result.type}:</strong>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogTestModal;
