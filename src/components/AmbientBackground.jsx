import CyberBackground from './CyberBackground';

/**
 * AmbientBackground - Forwarding wrapper to CyberBackground for backwards compatibility.
 */
export default function AmbientBackground(props) {
    return <CyberBackground {...props} />;
}
