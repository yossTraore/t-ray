import React from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf' // requestAnimationFrame polyfill
import DrumMachine from './drums'

class Player extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filesLoaded: false,
      loaded: false,
      guitar: false,
      guitarMuted: false,
      guitarLoaded: false,
      drums: false,
      drumsMuted: false,
      drumsLoaded: false,
      bass: false,
      bassMuted: false,
      bassLoaded: false,
      vocals: false,
      vocalsMuted: false,
      vocalsLoaded: false,
      keys: false,
      keysMuted: false,
      keysLoaded: false,
      playing: false,
      keysVolume: 1.0,
      guitarVolume: 1.0,
      drumsVolume: 1.0,
      bassVolume: 1.0,
      vocalsVolume: 1.0,
      seek: 0.0,
      isSeeking: false
    }

    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
    this.handleSeekingChange = this.handleSeekingChange.bind(this)
    this.toggleAllTracks = this.toggleAllTracks.bind(this)
    this.toggleVocalsMuted = this.toggleVocalsMuted.bind(this)
    this.toggleGuitarMuted = this.toggleGuitarMuted.bind(this)
    this.toggleBassMuted = this.toggleBassMuted.bind(this)
    this.toggleDrumsMuted = this.toggleDrumsMuted.bind(this)
    this.toggleKeysMuted = this.toggleKeysMuted.bind(this)
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  toggleAllTracks () {
    this.setState({
      guitar: !this.state.guitar,
      drums: !this.state.drums,
      bass: !this.state.bass,
      vocals: !this.state.vocals,
      keys: !this.state.keys,
      playing: !this.state.playing,
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.playerDrums.duration()
    })
  }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.playerDrums.stop()
    this.playerVocals.stop()
    this.playerBass.stop()
    this.playerKeys.stop()
    this.playerGuitar.stop()

    this.setState({
      playing: false,
      guitar: false,
      drums: false,
      bass: false,
      keys: false,
      vocals: false,
    })
    this.renderSeekPos()
  }
  
  toggleVocalsMuted () {
    this.setState({
      vocalsMuted: !this.state.vocalsMuted,
    })
  }
  
  toggleGuitarMuted () {
    this.setState({
      guitarMuted: !this.state.guitarMuted,
    })
  }

  toggleKeysMuted () {
    this.setState({
      keysMuted: !this.state.keysMuted,
    })
  }

  toggleBassMuted () {
    this.setState({
      bassMuted: !this.state.bassMuted,
    })
  }

  toggleDrumsMuted () {
    this.setState({
      drumsMuted: !this.state.drumsMuted,
    })
  }

  handleMouseDownSeek () {
    this.setState({
      isSeeking: true
    })
  }

  handleMouseUpSeek (e) {
    this.setState({
      isSeeking: false
    })

    this.playerDrums.seek(e.target.value)
    this.playerBass.seek(e.target.value)
    this.playerVocals.seek(e.target.value)
    this.playerKeys.seek(e.target.value)
    this.playerGuitar.seek(e.target.value)
  }

  handleSeekingChange (e) {
    this.setState({
      seek: parseFloat(e.target.value)
    })
  }

  renderSeekPos () {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.playerDrums.seek()
      })
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render () {
    return (
      <>
        <div className="flex">

          <div className="block w-full">
            <span className="block">Vocals Loaded... {JSON.stringify(this.state.vocalsLoaded)}</span>
            <span className="block">Guitar Loaded... {JSON.stringify(this.state.guitarLoaded)}</span>
            <span className="block">Bass Loaded... {JSON.stringify(this.state.bassLoaded)}</span>
            <span className="block">Keys Loaded... {JSON.stringify(this.state.keysLoaded)}</span>
            <span className="block">Drums Loaded... {JSON.stringify(this.state.drumsLoaded)}</span>
          </div>

          {this.state.vocalsLoaded && this.state.guitarLoaded && this.state.bassLoaded && this.state.keysLoaded && this.state.drumsLoaded && (
            <button className="dark:bg-yellow dark:text-off-black bg-red text-off-white font-mono py-2 px-3 block rounded-lg" onClick={this.toggleAllTracks}>
              { this.state.playing ? (<>Pause</>) : (<>Play</> ) }
            </button>
          )}

          { this.state.playing && (
            <button className="bg-off-black text-off-white font-mono py-2 px-3 block rounded-lg ml-2" onClick={this.handleStop}>Reset</button>
          )}
        </div>

        <div className="mt-1 mb-10">
          { this.state.playing ? (
            <span className="text-sm font-mono">Playing!</span>
          ) : (
            <span className="text-sm font-mono">Not currently playing!</span>
          )}
        </div>

        {/* <div className='seek'>
          <label className="font-mono">
            Seek:
            <span className='slider-container'>
              <input
                type='range'
                min='0'
                max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                step='.01'
                value={this.state.seek}
                onChange={this.handleSeekingChange}
                onMouseDown={this.handleMouseDownSeek}
                onMouseUp={this.handleMouseUpSeek}
              />
            </span>
          </label>
        </div> */}

        <ReactHowler 
          onLoad={this.handleOnLoad}
          ref={(ref) => (this.playerDrums = ref)}
          html5={true}
          preload={true}
          src='/stems/drums.mp3'
          playing={this.state.drums}
          volume={this.state.drumsVolume}
          mute={this.state.drumsMuted}
          onLoad={() => this.setState({ drumsLoaded: true })}
        />
        <ReactHowler
          ref={(ref) => (this.playerBass = ref)}
          html5={true}
          preload
          src='/stems/bass.mp3'
          playing={this.state.bass}
          volume={this.state.bassVolume}
          mute={this.state.bassMuted}
          onLoad={() => this.setState({ bassLoaded: true })}
        />
        <ReactHowler
          ref={(ref) => (this.playerKeys = ref)}
          html5={true}
          preload={true}
          src='/stems/keys.mp3'
          playing={this.state.keys}
          volume={this.state.keysVolume}
          mute={this.state.keysMuted}
          onLoad={() => this.setState({ keysLoaded: true })}
        />
        <ReactHowler
          ref={(ref) => (this.playerGuitar = ref)}
          html5={true}
          preload={true}
          src='/stems/guitar.mp3'
          playing={this.state.guitar}
          volume={this.state.guitarVolume}
          mute={this.state.guitarMuted}
          onLoad={() => this.setState({ guitarLoaded: true })}
        />
        <ReactHowler
          ref={(ref) => (this.playerVocals = ref)}
          html5={true}
          preload={true}
          src='/stems/vocals-lp.mp3'
          playing={this.state.vocals}
          volume={this.state.vocalsVolume}
          mute={this.state.vocalsMuted}
          onLoad={() => this.setState({ vocalsLoaded: true })}
        />


        <div className="w-full border-t border-black">
          <div className="w-full py-2 border-b border-black flex items-center">
            <button 
              className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2"
              onClick={this.toggleVocalsMuted}>
              { !this.state.vocalsMuted ? (<>Mute</>) : (<>Unmute</> ) }
            </button>
            <span className="font-mono">Vocals</span>

            <div className='volume ml-auto flex items-center'>
            <button className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2">Show Tabs</button>
              <label className="font-mono">
                Volume:
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.vocalsVolume}
                  onChange={e => this.setState({ vocalsVolume: parseFloat(e.target.value) })}
                />
                {this.state.vocalsVolume.toFixed(2)}
              </label>
            </div>
          </div>

          <div className="w-full py-2 border-b border-black flex items-center">
            <button 
              className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2"
              onClick={this.toggleGuitarMuted}>
              { !this.state.guitarMuted ? (<>Mute</>) : (<>Unmute</> ) }
            </button>
            <span className="font-mono">Guitar</span>

            <div className='volume ml-auto flex items-center'>
            <button className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2">Show Tabs</button>
              <label className="font-mono">
                Volume:
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.guitarVolume}
                  onChange={e => this.setState({ guitarVolume: parseFloat(e.target.value) })}
                />
                {this.state.guitarVolume.toFixed(2)}
              </label>
            </div>
          </div>

          <div className="w-full py-2 border-b border-black flex items-center">
            <button 
              className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2"
              onClick={this.toggleBassMuted}>
              { !this.state.bassMuted ? (<>Mute</>) : (<>Unmute</> ) }
            </button>
            <span className="font-mono">Bass</span>

            <div className='volume ml-auto flex items-center'>
            <button className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2">Show Tabs</button>
              <label className="font-mono">
                Volume:
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.bassVolume}
                  onChange={e => this.setState({ bassVolume: parseFloat(e.target.value) })}
                />
                {this.state.bassVolume.toFixed(2)}
              </label>
            </div>
          </div>

          <div className="w-full py-2 border-b border-black flex items-center">
            <button 
              className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2"
              onClick={this.toggleKeysMuted}>
              { !this.state.keysMuted ? (<>Mute</>) : (<>Unmute</> ) }
            </button>
            <span className="font-mono">Keys</span>

            <div className='volume ml-auto flex items-center'>
            <button className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2">Show Tabs</button>
              <label className="font-mono">
                Volume:
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.keysVolume}
                  onChange={e => this.setState({ keysVolume: parseFloat(e.target.value) })}
                />
                {this.state.keysVolume.toFixed(2)}
              </label>
            </div>
          </div>

          <div className="w-full py-2 border-b border-black flex items-center">
            <button 
              className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2"
              onClick={this.toggleDrumsMuted}>
              { !this.state.drumsMuted ? (<>Mute</>) : (<>Unmute</> ) }
            </button>
            <span className="font-mono">Drums</span>

            <div className='volume ml-auto flex items-center'>
            <button className="bg-off-black text-off-white dark:bg-off-white dark:text-off-black font-mono py-1 px-2 block rounded-lg mr-2">Show Tabs</button>
              <label className="font-mono">
                Volume:
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='.05'
                  value={this.state.drumsVolume}
                  onChange={e => this.setState({ drumsVolume: parseFloat(e.target.value) })}
                />
                {this.state.drumsVolume.toFixed(2)}
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-[3vw]">
          <DrumMachine/>
        </div>
      </>
    )
  }
}

export default Player