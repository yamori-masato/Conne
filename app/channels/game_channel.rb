class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{uuid}"
    Seek.create(uuid)
  end

  def unsubscribed
    Seek.remove(uuid)
  end

  def receive(data)
    puts "received #{data}"
    # ActionCable.server.broadcast "player_#{uuid}", {action: "received", msg: "received"}
  end
end
