# frozen_string_literal: true

class CyclicRedirectionCheckService
  def initialize(from, to)
    @from = from
    @to = to
  end

  def call
    Redirection.create!(from: @from, to: @to)
    check_cycle
  end

  private

    def check_cycle
      @slow = @to
      @fast = @to

      while @fast != true do
        fast_jump
        if @fast != true
          slow_jump
        end
        if @fast == @slow
          Redirection.last.delete
          return
        end
      end
    end

    def fast_jump
      first_destination = Redirection.where(from: @fast).empty? || Redirection.find_by!(from: @fast).to
      second_destination = true
      second_destination = (Redirection.where(from: first_destination).empty? ||
        Redirection.find_by!(from: first_destination).to) unless first_destination == true
      @fast = second_destination
    end

    def slow_jump
      @slow = Redirection.where(from: @slow).empty? || Redirection.find_by!(from: @slow).to unless @fast == @slow
    end
end
