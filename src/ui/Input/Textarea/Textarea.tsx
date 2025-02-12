import { useState, useRef, FC, useEffect } from "react";
import { useField } from "formik";
import "./Textarea.css";

interface ITextareaProps {
  id: string;
  onChange: (value: string) => void;
  label: string;
  className: string;
  name: string;
  isRequired: boolean;
  placeholder: string;
  textareaList?: string;
}

export const Textarea: FC<ITextareaProps> = ({
  id,
  onChange,
  className,
  label,
  name,
  isRequired,
  placeholder,
  textareaList,
  ...props
}) => {
  const [field, meta] = useField(name);

  const [text, setText] = useState(field.value);

  useEffect(() => {
    setText(field.value);
  }, [field.value]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    field.onChange(e);
    onChange(newText);
  };

  const handleScroll = () => {
    if (overlayRef.current && textAreaRef.current) {
      overlayRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  const lines =
    typeof text === "string" && text.length > 0 ? text.split("\n") : [];

  return lines.length > 0 ? (
    <div className={className}>
      <div className="list-textarea">
        <div ref={overlayRef} className="list-overlay">
          {lines.map((line, index) => (
            <div key={index} className="list-item">
              {line || <span className="empty-line">&nbsp;</span>}
            </div>
          ))}
        </div>
        <label htmlFor={name} className="label">
        {isRequired ? (
          <>
            {label}{" "}
            <span>*</span>
          </>
        ) : (
          label
        )}
      </label>
        <textarea
          id={id}
          name={name}
          ref={textAreaRef}
          value={text}
          onChange={handleChange}
          onScroll={handleScroll}
          rows={Math.max(lines.length, 3)}
          placeholder={placeholder}
          className="field"
          {...props}
        />
      </div>
    </div>
  ) : (
    <div className={className}>
      <label htmlFor={name} className="label">
        {isRequired ? (
          <>
            {label}{" "}
            <span>*</span>
          </>
        ) : (
          label
        )}
      </label>
      <textarea
        {...field}
        style={{ color: "inherit" }}
        id={id}
        name={name}
        placeholder={placeholder}
        className="field"
        {...props}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};
