import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocation } from "../ToolInvocation";

afterEach(() => {
  cleanup();
});

test("renders str_replace_editor with file name", () => {
    render(
      <ToolInvocation
        toolName="str_replace_editor"
        state="call"
        args={{ filePath: "/src/components/Button.tsx" }}
      />
    );
    
    expect(screen.getByText("Editing Button.tsx...")).toBeDefined();
    expect(screen.getByLabelText("Loading")).toBeDefined();
  });

test("renders create_file with file name", () => {
    render(
      <ToolInvocation
        toolName="create_file"
        state="call"
        args={{ path: "/src/components/NewComponent.tsx" }}
      />
    );
    
    expect(screen.getByText("Creating NewComponent.tsx...")).toBeDefined();
  });

test("renders edit_file with file name", () => {
    render(
      <ToolInvocation
        toolName="edit_file"
        state="call"
        args={{ path: "/src/App.tsx" }}
      />
    );
    
    expect(screen.getByText("Modifying App.tsx...")).toBeDefined();
  });

test("renders read_file with file name", () => {
    render(
      <ToolInvocation
        toolName="read_file"
        state="call"
        args={{ path: "/package.json" }}
      />
    );
    
    expect(screen.getByText("Reading package.json...")).toBeDefined();
  });

test("renders str_replace_based_edit_tool with file name", () => {
    render(
      <ToolInvocation
        toolName="str_replace_based_edit_tool"
        state="call"
        args={{ filePath: "/src/index.ts" }}
      />
    );
    
    expect(screen.getByText("Updating index.ts...")).toBeDefined();
  });

test("renders completed state without ellipsis", () => {
    render(
      <ToolInvocation
        toolName="str_replace_editor"
        state="result"
        result={{ success: true }}
        args={{ filePath: "/src/components/Button.tsx" }}
      />
    );
    
    expect(screen.getByText("Editing Button.tsx")).toBeDefined();
    expect(screen.getByLabelText("Complete")).toBeDefined();
    expect(screen.queryByLabelText("Loading")).toBeNull();
  });

test("renders unknown tool with tool name", () => {
    render(
      <ToolInvocation
        toolName="unknown_tool"
        state="call"
      />
    );
    
    expect(screen.getByText("unknown_tool...")).toBeDefined();
  });

test("handles missing file path gracefully", () => {
    render(
      <ToolInvocation
        toolName="str_replace_editor"
        state="call"
        args={{}}
      />
    );
    
    expect(screen.getByText("Editing file...")).toBeDefined();
  });

test("handles undefined args gracefully", () => {
    render(
      <ToolInvocation
        toolName="create_file"
        state="call"
      />
    );
    
    expect(screen.getByText("Creating new file...")).toBeDefined();
  });

test("extracts file name from nested paths", () => {
    render(
      <ToolInvocation
        toolName="edit_file"
        state="call"
        args={{ path: "/deeply/nested/folder/structure/Component.tsx" }}
      />
    );
    
    expect(screen.getByText("Modifying Component.tsx...")).toBeDefined();
  });