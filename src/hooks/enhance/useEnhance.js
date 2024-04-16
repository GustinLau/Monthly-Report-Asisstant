import { useElectron } from '@/hooks/electron/useElectron'

export function useEnhance() {
  const electron = useElectron()
  const CODE = 'whosyourdaddy'
  let pressed = []

  document.addEventListener('keyup', (e) => {
    // Append the pressed key to 'pressed' array
    pressed.push(e.key.toLowerCase())

    // Convert pressed array to string for comparison
    let pressedString = pressed.join('')

    // Check if 'pressed' matches 'CODE'
    if (pressedString === CODE) {
      electron?.ipcRenderer.send('open-dev-tools')
      pressed = []
    } else {
      // Check if 'CODE' starts with 'pressed'
      if (!CODE.startsWith(pressedString)) {
        // If not, remove characters from 'pressed' until it becomes a prefix of 'CODE'
        while (!CODE.startsWith(pressedString)) {
          pressed.pop()
          pressedString = pressed.join('')
        }
      }
    }
  })
}