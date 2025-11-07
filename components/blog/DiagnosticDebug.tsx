"use client";

/**
 * TEMPORARY DIAGNOSTIC COMPONENT
 *
 * Add this to BlogPostContent.tsx to see what data you're getting
 *
 * Usage:
 * import DiagnosticDebug from "./DiagnosticDebug";
 *
 * // Add right before FeaturedMedia:
 * <DiagnosticDebug post={post} />
 */

interface DiagnosticProps {
  post: any;
}

export default function DiagnosticDebug({ post }: DiagnosticProps) {
  // Extract video info
  let videoUrl = "";
  if (post?.video) {
    if (typeof post.video === "object" && post.video !== null) {
      videoUrl =
        post.video.url ||
        post.video.videoUrl ||
        post.video.link ||
        post.video.href ||
        "";
    } else if (typeof post.video === "string") {
      videoUrl = post.video;
    }
  }

  // Extract video ID
  let videoId = null;
  if (videoUrl) {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match?.[1]) {
        videoId = match[1];
        break;
      }
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.9)",
        color: "#00ff00",
        padding: "20px",
        borderRadius: "10px",
        fontFamily: "monospace",
        fontSize: "12px",
        maxWidth: "400px",
        maxHeight: "500px",
        overflow: "auto",
        zIndex: 9999,
        border: "2px solid #00ff00",
      }}
    >
      <h3 style={{ color: "#00ff00", marginTop: 0 }}>🔍 DEBUG INFO</h3>

      <div style={{ marginBottom: "10px" }}>
        <strong style={{ color: "#ffff00" }}>Post Object:</strong>
        <div style={{ color: post ? "#00ff00" : "#ff0000" }}>
          {post ? "✅ EXISTS" : "❌ UNDEFINED/NULL"}
        </div>
      </div>

      {post && (
        <>
          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Post Title:</strong>
            <div>{post.title || "❌ No title"}</div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Video Field:</strong>
            <div style={{ color: post.video ? "#00ff00" : "#ff0000" }}>
              {post.video ? "✅ EXISTS" : "❌ MISSING"}
            </div>
            {post.video && (
              <div style={{ fontSize: "10px", wordBreak: "break-all" }}>
                Type: {typeof post.video}
                <br />
                Value: {JSON.stringify(post.video, null, 2)}
              </div>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Extracted Video URL:</strong>
            <div style={{ color: videoUrl ? "#00ff00" : "#ff0000" }}>
              {videoUrl || "❌ No URL extracted"}
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Extracted Video ID:</strong>
            <div
              style={{
                color: videoId ? "#00ff00" : "#ff0000",
                fontWeight: "bold",
              }}
            >
              {videoId ? `✅ ${videoId}` : "❌ No video ID extracted"}
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Image Field:</strong>
            <div style={{ color: post.image ? "#00ff00" : "#ff0000" }}>
              {post.image ? "✅ EXISTS" : "❌ MISSING"}
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong style={{ color: "#ffff00" }}>Should Render Media:</strong>
            <div
              style={{
                color: videoId || post.image ? "#00ff00" : "#ff0000",
                fontWeight: "bold",
              }}
            >
              {videoId || post.image ? "✅ YES" : "❌ NO"}
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              paddingTop: "10px",
              borderTop: "1px solid #333",
            }}
          >
            <strong style={{ color: "#ffff00" }}>Environment Check:</strong>
            <div style={{ fontSize: "10px" }}>
              Sanity ID:{" "}
              {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                ? "✅ Set"
                : "❌ Missing"}
              <br />
              Sanity Dataset:{" "}
              {process.env.NEXT_PUBLIC_SANITY_DATASET ? "✅ Set" : "❌ Missing"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
