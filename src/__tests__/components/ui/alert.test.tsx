import Alert from "@/components/ui/alert";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

interface AlertProps {
  type?: string;
  title?: string;
  message?: string;
}

let successProps: AlertProps;

let errorProps: AlertProps;

describe("Alert UI", () => {
  beforeEach(() => {
    successProps = {
      type: "success",
      title: "Success",
      message: "message",
    };
    errorProps = {
      type: "error",
      title: "Error",
      message: "message",
    };
  });
  it("renders with success details", async () => {
    const { container } = render(<Alert {...successProps} />);

    const title = screen.queryAllByText("Success");
    const message = screen.queryAllByText("message");

    expect(container.firstChild).toHaveClass("text-green-500");
    expect(title.length).toBe(1);
    expect(message.length).toBe(1);
  });
  it("renders with error details", async () => {
    const { container } = render(<Alert {...errorProps} />);

    const title = screen.queryAllByText("Error");
    const message = screen.queryAllByText("message");

    expect(container.firstChild).toHaveClass("text-red-500");
    expect(title.length).toBe(1);
    expect(message.length).toBe(1);
  });
  it("renders with title bot no message", async () => {
    errorProps.message = "";
    render(<Alert {...errorProps} />);

    const title = screen.queryAllByText("Error");
    const message = screen.queryAllByText("message");

    expect(title.length).toBe(1);
    expect(message.length).toBe(0);
  });
  it("renders with message but no title", async () => {
    successProps.title = "";
    render(<Alert {...successProps} />);

    const title = screen.queryAllByText("Error");
    const message = screen.queryAllByText("message");

    expect(title.length).toBe(0);
    expect(message.length).toBe(1);
  });
});
