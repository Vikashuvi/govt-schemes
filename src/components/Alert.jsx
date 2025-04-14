import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertStyles = {
    success: 'bg-blue-100 text-blue-800 border-blue-200',
    error: 'bg-blue-100 text-blue-800 border-blue-200',
    warning: 'bg-yellow-100 text-blue-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  const icons = {
    success: <CheckCircle size={20} className="text-blue-500" />,
    error: <XCircle size={20} className="text-blue-500" />,
    warning: <AlertCircle size={20} className="text-yellow-500" />,
    info: <Info size={20} className="text-blue-500" />,
  };

  return (
    <div className={`rounded-md border p-4 mb-4 ${alertStyles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <div className="text-sm font-medium">{message}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Dismiss</span>
            <XCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
